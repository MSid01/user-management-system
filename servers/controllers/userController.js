const mysql = require("mysql");


//connection pool is a cache of dbs connection which can be reused again nd again
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

//view users
exports.view = (req, res) => {
  //connecting db
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    //use the connection
    connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
      //when done with the connection release it
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user\n", rows);
    });
  });
};

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    let searchTerm = req.body.search;
    console.log(searchTerm);
    //use the connection
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        //when done with the connection release it
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user\n", rows);
      }
    );
  });
};

//add new user
exports.create = (req, res)=>{
  const {first_name, last_name, email, phone, comments} = req.body;
  console.log(req.body);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    //use the connection
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments= ?",[first_name, last_name, email, phone, comments],
      (err, rows) => {
        //when done with the connection release it
        connection.release();
        if (!err) {
          res.render('add-user', {'alert':'success', 'msg': 'User added successfully' });
        } else {
          res.render('add-user', {'alert':'danger', 'msg': 'Sorry there is something Error' });
          console.log(err);
        }
        console.log("The data from user\n", rows);
      });
  });  

}

//edit
exports.edit = (req, res)=> {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    //use the connection
    connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, rows) => {
      //when done with the connection release it
      connection.release();
      if (!err) {
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user\n", rows);
    });
  });
}

//update
exports.update = (req, res)=> {
  const {first_name, last_name, email, phone, comments} = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    //use the connection
    connection.query("UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments= ? WHERE id = ?",[first_name, last_name, email, phone, comments ,req.params.id], (err, rows) => {
      //when done with the connection release it
      connection.release();
      if (!err) {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          else console.log(`DB connected ${connection.threadId}`);
      
          //use the connection
          connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();
            if (!err) {
              res.render("edit-user", {rows, 'alert':'success', 'msg': 'User updated successfully' });
            } else {
              console.log(err);
            }
            console.log("The data from user\n", rows);
          });
        });
      } else {
        console.log(err);
      }
      console.log("The data from user\n", rows);
    });
  });

}

//delete
exports.delete = (req, res)=> {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB ${connection.threadId}`);
  
    //use the connection
    connection.query("DELETE FROM user WHERE id = ?",[req.params.id], (err, rows) => {
      //when done with the connection release it
      connection.release();
      if (!err) {
        res.redirect('/');
      } else {
        console.log(err);
      }
      console.log("The data from from from user\n", rows);
    });
  });
}

exports.form = (req, res)=>{
  res.render('add-user');
}


exports.viewAll = (req, res) => {
  //connecting db
  pool.getConnection((err, connection) => {
    if (err) throw err;
    else console.log(`DB connected ${connection.threadId}`);

    console.log("asdfasdf")
    //use the connection
    connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, rows) => {
      //when done with the connection release it
      connection.release();
      if (!err) {
        res.render("view-user",{rows});
      } else {
        console.log(err);
      }
      console.log("The data from user\n", rows);
    });
  });
};