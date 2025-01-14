const express = require("express");

const app = express();

// Corrected the declaration of cookieParser
const cookieParser = require("cookie-parser");

const path = require("path");
// const ownersrouter=require("./routes/ownersrouter");
// const productrouter=require("./routes/productrouter");
 const usersrouter=require("./routes/usersrouter");


const db=require("./config/mongoose-connection");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Make sure cookieParser is used properly
app.use(cookieParser());

// Corrected _dirname to __dirname and closed the parentheses properly
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");
// app.use("/owners",ownersrouter);
app.use("/users",usersrouter);
// app.use("/products",productrouter);

// Set up a route for the root path
app.get("/", (req, res) => {
  res.send("Hey");
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
