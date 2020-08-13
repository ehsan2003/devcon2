import mongoose, {mongo} from "mongoose";
import logger from "@shared/logger";
import keys from '@conf/keys';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(keys.mongoUri,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => logger.info('successfully connected to database '))
    .catch((err) => logger.error('database connection failed ', err));
