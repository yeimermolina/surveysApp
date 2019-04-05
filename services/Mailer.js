const sgMail = require("@sendgrid/mail");
// const sendgrid = require("sendgrid");
const keys = require("../config/keys");

sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor({ subject, recipients }, content) {
    this.message = {
      from: "no-reply@feedbackapp.com",
      to: this.formatAddresses(recipients),
      subject: subject,
      content: [
        {
          type: "text/html",
          value: content
        }
      ],
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        },
        subscriptionTracking: {
          enable: true
        }
      }
    };
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email);
  }

  async send() {
    const response = await sgMail.send(this.message);
    return response;
  }
}

module.exports = Mailer;
