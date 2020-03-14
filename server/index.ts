import * as path from 'path';
import * as express from 'express';
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
require('dotenv').config();

class MainServer extends Server {
  reactPath = path.join(__dirname, './index.html');
  staticPath = path.join(__dirname, './static');
  isProduction = process.env.NODE_ENV === 'production';

  private readonly SERVER_START_MSG = 'Main server started on port: ';

  constructor() {
    super(true);
    const { UserController } = controllers;
    const userController = new UserController();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    super.addControllers([userController]);
    if (this.isProduction) {
      this.app.use('/static', express.static(this.staticPath));
      this.app.get('*', (req, res) => res.sendFile(this.reactPath));
    }
  }

  private setupControllers(): void {
    const ctlrInstances = [];
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        let Controller = (controllers as any)[name];
        ctlrInstances.push(new Controller());
      }
    }
    super.addControllers(ctlrInstances);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_START_MSG + port);
      Logger.Info(`DB HOST: ${process.env.DB_HOST}`);
    });
  }
}

export default MainServer;
