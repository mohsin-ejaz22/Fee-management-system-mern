import routes from './Routes.js';
import express from 'express'
import connectToDatabase from './database.js';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import passport from "passport"
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/UserModel.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 9000;
const app = express();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:true}));



app.use(express.json());
app.use(fileUpload({
    createParentPath: true
  }));

  app.use(session({
    secret: process.env.SESSION_SECRET ||"secret",
    resave:false,
    saveUninitialized:false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


const corsOptions= {
  origin:'http://localhost:5173',
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(routes);

connectToDatabase();




app.get('/',(req, res)=>{
    console.log("Hello")
})
app.listen(PORT ,()=>{
    console.log('server on http://localhost:'+PORT);
});
