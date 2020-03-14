import {OK, BAD_REQUEST} from 'http-status-codes';
import {Controller, Get} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {Request, Response} from 'express';

@Controller('api/user/')
class UserController {
  @Get(':name')
  private userName(req: Request, res: Response) {
    try {
      const {name} = req.params;
      return res.status(OK).json({
        message: `Hello there: ${name}`,
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
