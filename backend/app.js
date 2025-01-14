import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/send/mail", async (req, res) => {
    const { name, email, message } = req.body;
  
    // Validate the request body
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
  
    try {
      // Send the email using the sendEmail function
      await sendEmail({
        email: "vipulmth1@gmail.com",
        subject: "VIP GYM CLUB CONTACT",
        message,
        userEmail: email,
      });
      
      return res.status(200).json({
        success: true,
        message: "Message Sent Successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
  

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});