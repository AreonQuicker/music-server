import '@babel/polyfill/noConflict';
import cookieParser from 'cookie-parser';
import server from './server';

const jwt = require('jsonwebtoken');

server.express.use(cookieParser());

// TODO
server.express.use(async (req, res, next) => {
  const { authorization: token = null } = req.headers;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// TODO SET Credentials
server.start(
  {
    port: process.env.PORT || 4000,
    cors: {
      credentials: true,
      origin: true,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
