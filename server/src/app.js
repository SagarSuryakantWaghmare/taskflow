import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import todos from "./routes/todos.js";
import categories from "./routes/categories.js";
const app=express();
app.use(cors({
  origin:'*', // Allow all origins for development; adjust for production
}));
app.use(cookieParser());
app.use(express.json({limit:"16kb"}));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

// routes
app.use('/api/auth',auth)
app.use('/api/todos',todos);

app.use('/api/categories', categories);

export{app};
