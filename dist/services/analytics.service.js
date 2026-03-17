"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethods = exports.getTopSalles = exports.getRevenueSeries = exports.getReservationSeries = exports.getOverview = void 0;
const prisma_1 = require("../prisma");
const errors_1 = require("../errors");
const parseDateRange = (from, to) => {
    const range = {};
    if (from) {
        const parsedFrom = new Date(from);
        if (Number.isNaN(parsedFrom.getTime())) {
            throw new errors_1.ValidationError('Invalid from date format');
        }
        range.from = parsedFrom;
    }
    if (to) {
        const parsedTo = new Date(to);
        if (Number.isNaN(parsedTo.getTime())) {
            throw new errors_1.ValidationError('Invalid to date format');
        }
        range.to = parsedTo;
    }
    if (range.from && range.to && range.to < range.from) {
        throw new errors_1.ValidationError('to must be greater than or equal to from');
    }
    return range;
};
const buildPeriodKey = (date, granularity) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    if (granularity === 'day') {
        return `${year}-${month}-${day}`;
    }
    if (granularity === 'month') {
        return `${year}-${month}`;
    }
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000) + 1;
    const week = Math.ceil(dayOfYear / 7);
    return `${year}-W${String(week).padStart(2, '0')}`;
};
const assertGranularity = (granularity) => {
    const normalized = (granularity || 'day');
    if (!['day', 'week', 'month'].includes(normalized)) {
        throw new errors_1.ValidationError('granularity must be one of: day, week, month');
    }
    return normalized;
};
const getOverview = async (from, to) => {
    const range = parseDateRange(from, to);
    const reservationWhere = {
        ...(range.from ? { createdAt: { gte: range.from } } : {}),
        ...(range.to
            ? {
                createdAt: {
                    ...(range.from ? { gte: range.from } : {}),
                    lte: range.to,
                },
            }
            : {}),
    };
    const paymentWhere = {
        ...(range.from ? { createdAt: { gte: range.from } } : {}),
        ...(range.to
            ? {
                createdAt: {
                    ...(range.from ? { gte: range.from } : {}),
                    lte: range.to,
                },
            }
            : {}),
    };
    const [totalReservations, cancelledReservations, reservationAmount, paymentAmount, activeSalles, uniqueCustomers] = await Promise.all([
        prisma_1.prisma.reservation.count({ where: reservationWhere }),
        prisma_1.prisma.reservation.count({ where: { ...reservationWhere, status: 'CANCELLED' } }),
        prisma_1.prisma.reservation.aggregate({ where: reservationWhere, _sum: { totalAmount: true, paidAmount: true } }),
        prisma_1.prisma.payment.aggregate({ where: paymentWhere, _sum: { amount: true } }),
        prisma_1.prisma.salle.count({ where: { isActive: true } }),
        prisma_1.prisma.reservation.findMany({
            where: reservationWhere,
            select: { userId: true },
            distinct: ['userId'],
        }),
    ]);
    const totalRevenue = paymentAmount._sum.amount || 0;
    const bookedAmount = reservationAmount._sum.totalAmount || 0;
    const paidAmount = reservationAmount._sum.paidAmount || 0;
    return {
        range: { from: range.from || null, to: range.to || null },
        reservations: {
            total: totalReservations,
            cancelled: cancelledReservations,
            cancellationRate: totalReservations > 0 ? Math.round((cancelledReservations / totalReservations) * 10000) / 100 : 0,
        },
        finance: {
            bookedAmount: Math.round(bookedAmount * 100) / 100,
            paidAmount: Math.round(paidAmount * 100) / 100,
            remainingAmount: Math.round((bookedAmount - paidAmount) * 100) / 100,
            realizedRevenue: Math.round(totalRevenue * 100) / 100,
            averageRevenuePerReservation: totalReservations > 0 ? Math.round((totalRevenue / totalReservations) * 100) / 100 : 0,
        },
        activity: {
            activeSalles,
            uniqueCustomers: uniqueCustomers.length,
        },
    };
};
exports.getOverview = getOverview;
const getReservationSeries = async (granularity, from, to) => {
    const bucket = assertGranularity(granularity);
    const range = parseDateRange(from, to);
    const reservations = await prisma_1.prisma.reservation.findMany({
        where: {
            ...(range.from || range.to
                ? {
                    startTime: {
                        ...(range.from ? { gte: range.from } : {}),
                        ...(range.to ? { lte: range.to } : {}),
                    },
                }
                : {}),
        },
        select: { startTime: true },
        orderBy: { startTime: 'asc' },
    });
    const grouped = new Map();
    for (const reservation of reservations) {
        const key = buildPeriodKey(reservation.startTime, bucket);
        grouped.set(key, (grouped.get(key) || 0) + 1);
    }
    return Array.from(grouped.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([period, value]) => ({ period, value }));
};
exports.getReservationSeries = getReservationSeries;
const getRevenueSeries = async (granularity, from, to) => {
    const bucket = assertGranularity(granularity);
    const range = parseDateRange(from, to);
    const payments = await prisma_1.prisma.payment.findMany({
        where: {
            ...(range.from || range.to
                ? {
                    createdAt: {
                        ...(range.from ? { gte: range.from } : {}),
                        ...(range.to ? { lte: range.to } : {}),
                    },
                }
                : {}),
        },
        select: { amount: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
    });
    const grouped = new Map();
    for (const payment of payments) {
        const key = buildPeriodKey(payment.createdAt, bucket);
        grouped.set(key, (grouped.get(key) || 0) + payment.amount);
    }
    return Array.from(grouped.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([period, value]) => ({ period, value: Math.round(value * 100) / 100 }));
};
exports.getRevenueSeries = getRevenueSeries;
const getTopSalles = async (limit = 5, from, to) => {
    if (!Number.isInteger(limit) || limit <= 0) {
        throw new errors_1.ValidationError('limit must be a positive integer');
    }
    const range = parseDateRange(from, to);
    const grouped = await prisma_1.prisma.reservation.groupBy({
        by: ['salleId'],
        where: {
            ...(range.from || range.to
                ? {
                    createdAt: {
                        ...(range.from ? { gte: range.from } : {}),
                        ...(range.to ? { lte: range.to } : {}),
                    },
                }
                : {}),
            status: 'CONFIRMED',
        },
        _sum: { totalAmount: true, paidAmount: true },
        _count: { _all: true },
        orderBy: { _sum: { totalAmount: 'desc' } },
        take: limit,
    });
    const salleIds = grouped.map((item) => item.salleId);
    const salles = await prisma_1.prisma.salle.findMany({
        where: { id: { in: salleIds } },
        select: { id: true, label: true, building: true },
    });
    const salleMap = new Map(salles.map((salle) => [salle.id, salle]));
    return grouped.map((item) => ({
        salleId: item.salleId,
        salleLabel: salleMap.get(item.salleId)?.label || 'Unknown',
        building: salleMap.get(item.salleId)?.building || 'Unknown',
        reservations: item._count._all,
        bookedAmount: Math.round((item._sum.totalAmount || 0) * 100) / 100,
        paidAmount: Math.round((item._sum.paidAmount || 0) * 100) / 100,
    }));
};
exports.getTopSalles = getTopSalles;
const getPaymentMethods = async (from, to) => {
    const range = parseDateRange(from, to);
    const grouped = await prisma_1.prisma.payment.groupBy({
        by: ['method'],
        where: {
            ...(range.from || range.to
                ? {
                    createdAt: {
                        ...(range.from ? { gte: range.from } : {}),
                        ...(range.to ? { lte: range.to } : {}),
                    },
                }
                : {}),
        },
        _sum: { amount: true },
        _count: { _all: true },
        orderBy: { _sum: { amount: 'desc' } },
    });
    const totalAmount = grouped.reduce((sum, item) => sum + (item._sum.amount || 0), 0);
    return grouped.map((item) => {
        const amount = Math.round((item._sum.amount || 0) * 100) / 100;
        return {
            method: item.method,
            count: item._count._all,
            amount,
            percentage: totalAmount > 0 ? Math.round((amount / totalAmount) * 10000) / 100 : 0,
        };
    });
};
exports.getPaymentMethods = getPaymentMethods;
