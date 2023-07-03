import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//Import routes
import TodoItemRoute from "./routes/todoItems";

dotenv.config();

const app = express();


//Use express.json() to get data into json format
app.use(express.json());

//Port
const PORT = process.env.PORT || 5000;

//Connect with server in different port
app.use(cors());

//MongoDB connect
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use('/', TodoItemRoute);

//Add port and connect to server
app.listen(PORT, () => console.log("Server connected"));
