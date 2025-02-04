const express = require("express")
const app = express()
const cors = require('cors')
const connecttoDB = require("./config/db")
const loginRoute = require("./routes/authRoutes")
const postUploadRoute = require("./routes/postUploadRoutes")
const getPostRoute = require("./routes/getPostRoutes")
const path = require('path')
const postupdateRoutes = require("./routes/postActionRoutes")
const bodyParser = require("body-parser");
const searchRoute =  require("./routes/searchRoutes")

connecttoDB()

app.use(bodyParser.json()); // Parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
// Serve static files from the React build folder
app.use( express.static(path.join(__dirname, '../client/build')));
// Middleware to parse JSON data from request body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res,next)=>{
  res.set('Access-Control-Allow-Origin', 'https://6c84-2401-4900-6301-54aa-50e9-d125-d12a-da82.ngrok-free.app')
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'),
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next() // passing to next middleware
})

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["https://student-connect-client.vercel.app",  "http://localhost:3000","https://6c84-2401-4900-6301-54aa-50e9-d125-d12a-da82.ngrok-free.app","http://192.168.1.2:3000","http://192.168.1.6:5000","https://tiny-toffee-e5ee83.netlify.app","http://192.168.1.7:3000","student-connect-client-bdvwfgaun-karthiksankarfds-projects.vercel.app"]; // frontend origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions))
app.use("/api/auth", loginRoute);
app.use("/api", postUploadRoute );
app.use("/api", getPostRoute)
app.use("/api" , postupdateRoutes)
app.use("/api" , searchRoute)

// Catch-all route for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(5000, "0.0.0.0", ()=>{
    console.log("The server is running on localhost 5000")
})







