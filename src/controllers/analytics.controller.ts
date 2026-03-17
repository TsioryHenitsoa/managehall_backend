import { Controller, Get, Query, Route, Security, Tags } from 'tsoa'
import * as analyticsService from '../services/analytics.service'

interface SeriesPoint {
  period: string
  value: number
}

@Route('analytics')
@Tags('Analytics')
export class AnalyticsController extends Controller {

  @Get('overview')
  @Security('jwt', ['ADMIN'])
  public async getOverview(
    @Query() from?: string,
    @Query() to?: string
  ): Promise<any> {
    return analyticsService.getOverview(from, to)
  }

  @Get('reservations/series')
  @Security('jwt', ['ADMIN'])
  public async getReservationSeries(
    @Query() granularity?: string,
    @Query() from?: string,
    @Query() to?: string
  ): Promise<SeriesPoint[]> {
    return analyticsService.getReservationSeries(granularity, from, to)
  }

  @Get('revenue/series')
  @Security('jwt', ['ADMIN'])
  public async getRevenueSeries(
    @Query() granularity?: string,
    @Query() from?: string,
    @Query() to?: string
  ): Promise<SeriesPoint[]> {
    return analyticsService.getRevenueSeries(granularity, from, to)
  }

  @Get('salles/top')
  @Security('jwt', ['ADMIN'])
  public async getTopSalles(
    @Query() limit?: number,
    @Query() from?: string,
    @Query() to?: string
  ): Promise<any[]> {
    return analyticsService.getTopSalles(limit, from, to)
  }

  @Get('payments/methods')
  @Security('jwt', ['ADMIN'])
  public async getPaymentMethods(
    @Query() from?: string,
    @Query() to?: string
  ): Promise<any[]> {
    return analyticsService.getPaymentMethods(from, to)
  }
}
