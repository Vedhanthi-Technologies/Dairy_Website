const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require(`body-parser`);
const nodemailer = require(`nodemailer`);
const mongoose = require(`mongoose`);
const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: `gmail`,
  auth: {
    user: `vishnuthangaraj.vedhanthi@gmail.com`,
    pass: `cyrd rdon nvaa falc`,
  },
});

// MongoDB connection
mongoose
  .connect(`mongodb://localhost:27017/Dairy_Products`)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error:`, err);
    process.exit(1);
  });

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Contact = mongoose.model(`Contact`, contactSchema);
const Newsletter = mongoose.model(`NewsLetter`, newsletterSchema);

// Add Contact Message to Database and Send Mail
app.post(`/api/contact`, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContact = new Contact({ name, email, subject, message });

    await newContact.save();
    // Sending Mail (Owner)
    const mailOptions = {
      from: `vishnuthangaraj.vedhanthi@gmail.com`,
      to: `vishnuthangaraj.original@gmail.com`,
      subject: `Enquiry from ${name} | Moofy`,
      text: `Hello Vishnu,
       ${message}

      Name: ${name}
      Email: ${email}`,
    };
    await transporter.sendMail(mailOptions);
    // Sending Mail (Replay)
    const mailOptions2 = {
      from: `vishnuthangaraj.vedhanthi@gmail.com`,
      to: email,
      subject: `Enquiry | Moofy`,
      text: `Hello ${name},

       We have received your message. our executive will get back to you in 24 hours.
       Review Your Message :
            ${message}
      Vishnu Thangaraj
      info@insurance.com
      6383 580 365`,
    };

    await transporter.sendMail(mailOptions2);
    res.status(200).json({
      message: `Contact saved and email sent successfully`,
      success: true,
    });
  } catch (error) {
    console.error(`Error processing contact form:`, error);
    res.status(500).json({
      error: `An error occurred while processing your request`,
      success: false,
    });
  }
});

// Add Newsletter to Database and Send Mail
app.post(`/api/newsletter`, async (req, res) => {
  try {
    const { email } = req.body;

    const newsletters = new Newsletter({ email });
    await newsletters.save();

    res.status(200).json({
      message: `Newsletter saved`,
      success: true,
    });
  } catch (error) {
    console.error(`Error processing Newsletter form:`, error);
    res.status(500).json({
      error: `An error occurred while processing your request`,
      success: false,
    });
  }
});

// Fetch All Contacts
app.get(`/api/get_contacts`, async (req, res) => {
  try {
    const Contacts = await Contact.find();
    res.status(200).json(Contacts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving Contacts", error: err });
  }
});

// Fetch All Newsletters
app.get(`/api/get_newsletters`, async (req, res) => {
  try {
    const Newsletters = await Newsletter.find();
    res.status(200).json(Newsletters);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving Newsletters", error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
