import nodemailer from "nodemailer";

const handler = async (req, res) => {
  // const { name, email, message, token } = JSON.parse(req.body);
  const { name, email, message } = JSON.parse(req.body);

  // async function validateHuman(token: string): Promise<boolean> {
  //   const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  //   const response = await fetch(
  //     `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
  //     {
  //       method: "POST",
  //     }
  //   );
  //   const data = await response.json();
  //   return data.success;
  // }

  // const human = await validateHuman(token);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // if (!human) {
  //   res.status(400);
  //   return res.json({ errorMessage: "Sorry we don't talk to robots :)" });
  // }

  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: "lawrenceardosa@gmail.com",
      subject: `Message from ${name} through Quaver website`,
      html: `<h1>You have a new message</h1><br/><br/><br/>
      <p><b>Name: </b> ${name}</p><br/>
      <p><b>Email: </b> ${email}</p><br/>
      <p><b>Message: </b> ${message}</p><br/>`,
    });

    res.status(200).json({
      message: "Message Sent!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({
        errorMessage: "Something went wrong please try again later",
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      });
  }
};

export default handler;
