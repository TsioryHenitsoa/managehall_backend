import jwt from 'jsonwebtoken'
import { Request } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'jwt') {
    const authHeader = request.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined

    if (!token) {
      return Promise.reject(new Error('No token provided'))
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
        if (err) return reject(new Error('Invalid or expired token'))

        // Check role-based scopes if provided
        if (scopes?.length && !scopes.includes(decoded.role)) {
          return reject(new Error('Insufficient permissions'))
        }

        resolve(decoded)
      })
    })
  }

  return Promise.reject(new Error('Unknown security scheme'))
}
