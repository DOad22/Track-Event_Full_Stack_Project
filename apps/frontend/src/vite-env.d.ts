/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email?: string;
      [key: string]: any;
    };
  }
}