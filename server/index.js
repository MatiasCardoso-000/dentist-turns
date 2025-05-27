import express from "express";
import connetDB from "./config/database.js";
import helmet from 'helmet'
import {router as AuthRouter} from './routes/auth.js'
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware

app.use(helmet.xXssProtection())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connetDB.connectDB();


app.use('/auth', AuthRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
