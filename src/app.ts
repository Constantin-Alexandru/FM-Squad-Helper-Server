import express, { Express, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';

import { config } from './config/config';
import Logging from './libraries/Logging';
import { setup } from './setup';

const router: Express = express();

mongoose
  .connect(config.MONGO_URL, {
    retryWrites: true,
    writeConcern: { w: 'majority' },
  })
  .then(() => {
    Logging.info('MongoDB connection successful');
    setup();
    StartServer();
  })
  .catch((error) => {
    Logging.error(error);
  });

function StartServer(): void {
  router.use(cors());

  router.use((req: Request, res, next) => {
    /** Logging the requests */
    Logging.info(
      `[${req.url} - ${req.method}] IP_ADDRESS: ${
        req.socket.remoteAddress !== undefined ? req.socket.remoteAddress : ''
      }  `
    );

    res.on('finish', () => {
      Logging.info(
        `[${req.url} - ${req.method}] IP_ADDRESS: ${
          req.socket.remoteAddress !== undefined ? req.socket.remoteAddress : ''
        } - STATUS: ${res.statusCode}  `
      );
    });
    next();
  });

  /** Setting up Express */

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** API rules */
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }
    next();
  });

  /** Healthcheck */
  router.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: 'pong' });
  });

  /** Error handling */
  router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${req.url} was not found`);
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  /** Starting the server */
  http
    .createServer(router)
    .listen(config.PORT, () =>
      Logging.info(
        `Server started successfully at: ${config.URL}:${config.PORT}`
      )
    );
}
