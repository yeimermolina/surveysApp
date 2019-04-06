const mongoose = require("mongoose");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Send Email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send({ error });
    }
  });

  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.get("/api/surveys/:id/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        //Extract the path from the url
        const pathname = new URL(url).pathname;

        //returns object with the params if pathname matches specified url e.g {surveyId: 'test', choice: 'yes'}
        const match = p.test(pathname);

        if (match) {
          return { ...match, email };
        }
      })
      .compact() //Remove undefined elements
      .uniqBy("email", "surveyId") //remove duplicates
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false
              }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true }
          }
        ).exec();
      })
      .value();
    console.log(events);
    res.send({});
  });
};
