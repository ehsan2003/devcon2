import 'tsconfig-paths/register';
import dotenv from 'dotenv';
import logger from "@shared/logger";
import app from '../app';

console.clear();
console.log(process.version);
dotenv.config();
if (process.env.NODE_ENV === 'development')
    process.env.IS_DEV = 'true';
process.on('unhandledRejection', (err) => {
    logger.error('unhandled promise rejection', {err});
    console.error(err);
});
process.on('uncaughtException', (err) => {
    logger.error('uncaughtException', {err});
    console.error(err);
});

const PORT = process.env.PORT || '3001';
app.listen(PORT, (err: Error) => {
    if (err) {
        logger.error(`couldn't listen some thing went wrong`, {err});
        console.error(err);
        process.exit(1);
    } else {
        console.log(`visit link : https://localhost:${PORT}`);
        logger.info(`listening on port : ${PORT}`, {PORT});
    }
});
