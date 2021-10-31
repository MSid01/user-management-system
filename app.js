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

//connection pool is a cache of dbs connection which can be reused again nd again
// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD
// });

const routes = require("./servers/routes/user");
app.use('/', routes);


app.listen(port, () => {
  console.log(`app listning on port ${port}`);
});

