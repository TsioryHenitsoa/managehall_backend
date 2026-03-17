import { Body, Controller, Post, Route, Tags } from 'tsoa'
import * as authService from '../services/auth.service'

interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

interface AuthPayload {
  user: AuthUser
  token: string
}

interface SignupBody {
  email: string
  name: string
  password: string
}

interface LoginBody {
  email: string
  password: string
}

@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {

  @Post('signup')
  public async signup(@Body() body: SignupBody): Promise<AuthPayload> {
    const result = await authService.signup(body.email, body.name, body.password)
    this.setStatus(201)
    return result
  }

  @Post('login')
  public async login(@Body() body: LoginBody): Promise<AuthPayload> {
    return authService.login(body.email, body.password)
  }
}
