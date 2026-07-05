const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nahiaapaariapnipe",
    database: "student_task_manager"
});


connection.connect((err) => {

    if (err) {
        console.log("Connection Failed!");
        console.log(err);
        return;
    }

    console.log("✅ Connected to MySQL Successfully!");

});

module.exports = connection;