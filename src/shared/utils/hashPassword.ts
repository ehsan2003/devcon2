import configurations from "@conf/configurations";
import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, configurations.passwordHash.saltRounds);