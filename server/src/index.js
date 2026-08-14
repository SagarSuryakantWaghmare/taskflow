import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./db/index.js";
import { app } from "./app.js";

if (!process.env.MONGODB_URI) {
    throw new Error(
        "MONGODB_URI is not defined. Add it to server/.env"
    );
}

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚡ Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
        process.exit(1);
    });