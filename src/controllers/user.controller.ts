import { Controller, Get, Request, Route, Security, Tags } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import * as userService from '../services/user.service'

interface UserResponse {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
}

@Route('users')
@Tags('User')
export class UserController extends Controller {

  @Get('/')
  @Security('jwt', ['ADMIN'])
  public async getUsers(): Promise<UserResponse[]> {
    return userService.getAllUsers()
  }

  @Get('me')
  @Security('jwt')
  public async getMe(@Request() req: ExpressRequest): Promise<UserResponse | null> {
    const decoded = (req as any).user
    return userService.getUserById(decoded.sub)
  }
}
