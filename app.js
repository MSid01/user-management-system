const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 3000;

//static files
const path = require("path");
console.log(__dirname);
app.use("/static", express.static(path.join(__dirname, "public")));

//handlesbars- templating engine- similar to ejs
app.engine("hbs", exphbs({ extname: "hbs" }));
app.set("view engine", "hbs");

const routes = require("./servers/routes/user");
app.use('/', routes);

app.listen(port, () => {
  console.log(`app listning on port ${port}`);
});

