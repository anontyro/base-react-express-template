import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import connection from '../connection';
import User from '../database/user/entity';
import { Like } from 'typeorm';

@Controller('api/user/')
class UserController {
  @Get(':name')
  private userName(req: Request, res: Response) {
    try {
      connection.then(async connection => {
        const { name } = req.params;

        const user: User[] = await connection.manager.find(User, {
          where: {
            firstName: Like(`%${name}%`),
          },
        });
        return res.status(OK).json({
          message: `Hello there: ${name}`,
          response: user,
        });
      });
    } catch (err) {
      Logger.Err(err, true);
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}

export default UserController;
