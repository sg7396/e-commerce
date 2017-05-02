/*
'use strict';
var nodeMailer = {
    "Mandrill" : {
        host: "smtp.mandrillapp.com", // hostname
        //secureConnection: true, // use SSL
        port: 587, // port for secure SMTP
        auth: {
            user: "",
            pass: ""
        }
    }
};
module.exports = {
    nodeMailer: nodeMailer
};
*/
'use strict';
var smtpTransport=require('nodemailer-smtp-transport');

var nodeMailer = {
    "Mandrill" : {
        host: "smtp.mandrillapp.com",
        port: 587,
        auth: {
            user: "",
            pass: ""
        }
    }
};

module.exports = {
    nodeMailer: nodeMailer
};
