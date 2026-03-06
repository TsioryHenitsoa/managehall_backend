import { Controller, Get, Route, Tags } from 'tsoa'
import * as userService from '../services/user.service'

interface User {
  id: string
  email: string
  name: string
}

@Route('users')
@Tags('User')
export class UserController extends Controller {
  @Get('/')
  public async getUsers(): Promise<User[]> {
    try {
      return await userService.getAllUsers()
    } catch (err) {
      this.setStatus(500)
      throw new Error('Internal Server Error')
    }
  }
}
