import '@babel/polyfill/noConflict';
import cookieParser from 'cookie-parser';
import server from './server';

server.express.use(cookieParser());

server.express.use(async (req, res, next) => {
  next();
});

server.start(
    {
      port: process.env.PORT || 4000,
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
    },
    deets => {
      console.log(`Server is now running on port http://localhost:${deets.port}`);
    }
  );
  