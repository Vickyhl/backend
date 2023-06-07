import nodemailer from "nodemailer";

export const receipt = async (req, res) => {
  const email = req.params.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vickyeaf@gmail.com",
      pass: "fcevjskxhtvcxihy",
    },
  });

  const mailOptions = {
    from: "vickyeaf@gmail.com",
    to: "vikush40@gmail.com",
    subject: "Your receipt from Eat&Fit!",
    attachments: [
      {
        content: `reciept of the payment

        Company Name: Eat&Fit    
        Email: vickyeaf@gmail.com	
        
        +---------+---------------------------------+------------+----------+
        |    QTY  |  Description                    |  Unit Price| Total    |
        +---------+---------------------------------+------------+----------+
        |     1   |   Personalized nutrition menu   |     5$     |   5$     |
        +---------+---------------------------------+------------+----------+
                   
        Amount Paid: 5$
        
        Thanks for the purchase!`,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
