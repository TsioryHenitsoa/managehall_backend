import { Body, Controller, Post, Response, Route, Tags } from 'tsoa'
import * as authService from '../services/auth.service'

interface AuthUser {
  id: string
  email: string
  name: string
}

interface AuthPayload {
  user: AuthUser
  token: string
}

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {

  @Post('signup')
  @Response(400, 'email, name and password are required')
  @Response(409, 'Email already exists')
  public async signup(
    @Body() body: { email: string; name: string; password: string }
  ): Promise<AuthPayload> {
    const { email, name, password } = body

    if (!email || !name || !password) {
      this.setStatus(400)
      throw new Error('email, name and password are required')
    }

    try {
      const result = await authService.signup(email, name, password)
      this.setStatus(201)
      return result
    } catch (err) {
      if (err instanceof Error && err.message === 'EMAIL_ALREADY_EXISTS') {
        this.setStatus(409)
        throw new Error('Email already exists')
      }

      this.setStatus(500)
      throw new Error('Internal Server Error')
    }
  }

  @Post('login')
  @Response(400, 'email and password are required')
  @Response(401, 'Invalid credentials')
  public async login(
    @Body() body: { email: string; password: string }
  ): Promise<AuthPayload> {
    const { email, password } = body

    if (!email || !password) {
      this.setStatus(400)
      throw new Error('email and password are required')
    }

    try {
      const result = await authService.login(email, password)
      this.setStatus(200)
      return result
    } catch (err) {
      if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
        this.setStatus(401)
        throw new Error('Invalid credentials')
      }

      this.setStatus(500)
      throw new Error('Internal Server Error')
    }
  }
}
