import '@shared/utils';
import express from 'express';
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from './routes';
import helmet from "helmet";
import '@shared/db-initializer';
import passport from "passport";
import configPassport from '@conf/passport';

const isDev = process.env.NODE_ENV === 'development';
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public', {}));
app.use(passport.initialize());
configPassport(passport);

app.use(routes);
export default app;