
import nodemailer from 'nodemailer';

type MailType = {
    email: string;
    name: string;
    otp : number;
    emailType: 'REGISTER' | 'CHANGE_PASSWORD';
};

const sendMail = ({email, name, otp, emailType} : MailType) => {

    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: 'harsh@gmail.com',
        to: email,
        subject: emailType === 'REGISTER' ? "OTP for verification" : "OTP for password change",
        html: 
            `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1200px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                        <a href="http://chatmeon.vercel.app" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Chatme</a>
                    </div>
                    <p style="font-size:1.1em">Hi, ${name}</p>
                    <p>Thank you for using Chatme.</p>
                    <p>Use the following OTP to ${emailType === 'REGISTER' ? 'verify your email' : 'change your password'}.</p>
                    <p style="font-size:0.9em;color:#FF0000">OTP is valid for 3 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                        ${otp}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Chatme</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                        <p>Chatme</p>
                        <p>Dehradun, Uttarakhand</p>
                    </div>
                </div>
            </div>
            `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('OTP sent: ' + info.response);
        }
    });


}

export default sendMail;