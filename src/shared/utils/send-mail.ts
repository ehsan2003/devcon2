import mailer from 'nodemailer';
import keys from '@conf/keys';

const transporter = mailer.createTransport(keys.smtpUrl);

export interface MailerOptions {
    from?: string;
    subject: string;
    to: string[] | string;
    text: () => string;
    html: () => string;
}

export default ({
                    from = 'info@devcon2.com'
                    , to
                    , subject
                    , text
                    , html
                }: MailerOptions) => {

    return transporter.sendMail({
        from, subject
    });
};