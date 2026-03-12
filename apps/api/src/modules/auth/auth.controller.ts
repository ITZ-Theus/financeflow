import { Request, Response } from 'express'
import { z } from 'zod'
import { AuthService } from './auth.service'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

export class AuthController {
  private service = new AuthService()

  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body)
    const result = await this.service.register(data)
    return res.status(201).json(result)
  }

  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body)
    const result = await this.service.login(data)
    return res.status(200).json(result)
  }
}
