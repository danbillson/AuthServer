import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { connect } from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Database
connect(
    `mongodb://localhost:auth/auth`,
    { useNewUrlParser: true }
);

// App
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log(`Server is listening on port: ${port}`);
