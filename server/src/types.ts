import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createUpdootLoader } from './utils/createUpdootLoader';
import { createCreatorLoader } from './utils/createUserLoader';
// import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createCreatorLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
