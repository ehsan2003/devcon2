import nodeMailer, {SendMailOptions} from 'nodemailer';
import keys from "@conf/keys";

const transport = nodeMailer.createTransport(keys.smtpUrl);
export const sendMail = (options: Pick<SendMailOptions, 'subject' | 'text' | 'to'>) =>
    transport.sendMail({...options, to: 'ehsan2003.2003.382@gmail.com'});