import "express";
import session from "express-session";

declare module "express-serve-static-core" {
  interface Request {
    session: session.Session & Partial<session.SessionData> & {
      destroy(callback?: (err?: any) => void): void;
    };
  }
}