const connection = require("./database/db");

const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});
app.use(express.static("public"));

const PORT = 3000;


// const tasks = [
//   {
//     id: 1,
//     title: "Complete Web Development Assignment",
//     description: "Finish Express practice",
//     subject: "Web Development",
//     priority: "High",
//     deadline: "2026-07-08",
//     status: "Pending",
//     completed: false,
//     createdAt: "2026-07-04"
//   },
//   {
//     id: 2,
//     title: "Revise SQL Queries",
//     description: "Practice JOIN and GROUP BY",
//     subject: "Database",
//     priority: "Medium",
//     deadline: "2026-07-09",
//     status: "Completed",
//     completed: true,
//     createdAt: "2026-07-03"
//   },
//   {
//     id: 3,
//     title: "Prepare AI Presentation",
//     description: "Complete PPT slides",
//     subject: "Artificial Intelligence",
//     priority: "High",
//     deadline: "2026-07-11",
//     status: "Pending",
//     completed: false,
//     createdAt: "2026-07-04"
//   }
// ];

// Home Route
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/signup.html");
// });

// Tasks Route
app.get("/tasks", (req, res) => {
  const userId = req.query.user_id;

  const sql = "SELECT * FROM tasks WHERE user_id = ?";

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to fetch tasks"
      });
    }

    res.json(results);
  });
});

// About Route
  app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM tasks WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch task" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(results[0]);
  });
});

app.post("/tasks", (req, res) => {
  const { title, description, subject, priority, deadline, status, completed } = req.body;

  const sql = `
    INSERT INTO tasks 
    (title, description, subject, priority, deadline, status, completed)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [title, description, subject, priority, deadline, status, completed];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to add task" });
    }

    res.status(201).json({
      message: "Task added successfully",
      taskId: result.insertId
    });
  });
});



app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  connection.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please login."
        });
      }
      return res.status(500).json({
        success: false,
        
        message: "Signup failed."
      });
    }
  });
});



app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Login failed."
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: results[0].id,
        name: results[0].name,
        email: results[0].email
      }
    });
  });
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const description = req.body.description;
  const subject = req.body.subject;
  const priority = req.body.priority;
  const deadline = req.body.deadline;
  const status = req.body.status;
  const completed = req.body.completed;

  const sql = `
    UPDATE tasks
    SET title=?, description=?, subject=?, priority=?, deadline=?, status=?, completed=?
    WHERE id=?
  `;

  const values = [
    title,
    description,
    subject,
    priority,
    deadline,
    status,
    completed,
    id
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Task update failed" });
    }

    res.json({ message: "Task updated successfully" });
  });
});


app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  console.log("DELETE route hit. ID =", id);

  const sql = "DELETE FROM tasks WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log("DELETE ERROgiR:", err);
      return res.status(500).json({
        message: "Task deletion failed",
        error: err.message
      });
    }

    console.log("DELETE RESULT:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  });
});


// app.get("/tasks/pending", (req, res) => {

//   const sql = "SELECT * FROM tasks WHERE status='Pending'";

//   connection.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch pending tasks" });
//     }

//     res.json(results);
//   });
// });



// app.get("/tasks/completed", (req, res) => {
//   const sql = "SELECT * FROM tasks WHERE status='Completed'";

//   connection.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch completed tasks" });
//     }

//     res.json(results);
//   });
// });


// app.get("/tasks", (req, res) => {
//   const sql = "SELECT * FROM tasks";

//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Failed to fetch tasks" });
//     }

//     res.json(results);
//   });
// });

// app.get("/tasks/:id", (req, res) => {
//   const id = req.params.id;

//   const sql = "SELECT * FROM tasks WHERE id = ?";

//   connection.query(sql, [id], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "Failed to fetch task" });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.json(results[0]);
//   });
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});