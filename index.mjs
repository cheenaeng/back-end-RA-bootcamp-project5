import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';

import bindRoutes from './routes.mjs';

// to add on heroku
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
// const FRONTEND_URL = 'https://kopiracoon.netlify.app';

// Initialise Express instance
const app = express();

app.enable('trust proxy');
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));
// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
app.use(express.json());
// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;

app.listen(PORT);
