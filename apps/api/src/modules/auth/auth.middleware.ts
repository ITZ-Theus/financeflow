import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env'
import { AppError } from '../../shared/errors/AppError'

export interface AuthRequest extends Request {
  userId?: string
}

export function authMiddleware(req: AuthRequest, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Token não fornecido', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as { sub: string }
    req.userId = decoded.sub
    next()
  } catch {
    throw new AppError('Token inválido ou expirado', 401)
  }
}
