import { CorsOptions } from 'cors';7

// WHITELIST
export const whitelist = ['http://localhost:3000'];

// CORS
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export const port = process.env.PORT || 4000;
