# 📚 TaskNest

A modern full-stack student task management application built using **HTML, Tailwind CSS, JavaScript, Node.js, Express.js, and MySQL**. TaskNest helps students organize academic work by managing pending and completed tasks through a clean, responsive, and intuitive interface.

---

## ✨ Features

- 📋 Create new tasks
- 📖 View all tasks
- ✏️ Edit existing tasks
- 🗑 Delete tasks
- 🔍 Search pending tasks
- 🔍 Search completed tasks
- 📊 Dynamic dashboard statistics
- 📄 Individual task details page
- 📅 Deadline management
- ⚡ Priority management
- 📱 Responsive user interface
- 🎨 Modern nude-themed UI using Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- HTML5
- Tailwind CSS
- JavaScript (ES6)

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Tools
- MySQL Workbench
- Thunder Client
- VS Code
- Git & GitHub

---

## 📂 Project Structure

```text
TaskNest
│
├── public
│   ├── index.html
│   ├── pending.html
│   ├── completed.html
│   ├── task.html
│   ├── edit-task.html
│   ├── add-task.html
│   ├── script.js
│   └── style.css
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Features Overview

### Dashboard
- Displays overall task statistics
- Quick navigation
- Dynamic task counts

### Pending Tasks
- View all pending tasks
- Search tasks
- Open individual task details

### Completed Tasks
- View completed tasks
- Search completed work
- Track accomplishments

### Task Details
- View complete information
- Edit task
- Delete task

### Add Task
- Create tasks directly from the frontend
- Stores data in MySQL using REST APIs

---

## 🔄 CRUD Operations

| Operation | HTTP Method | Endpoint |
|-----------|------------|----------|
| Create Task | POST | `/tasks` |
| Get All Tasks | GET | `/tasks` |
| Get Task By ID | GET | `/tasks/:id` |
| Update Task | PUT | `/tasks/:id` |
| Delete Task | DELETE | `/tasks/:id` |

---

## 💾 Database Schema

### Table: tasks

| Column | Type |
|---------|------|
| id | INT (Primary Key, Auto Increment) |
| title | VARCHAR(255) |
| description | TEXT |
| subject | VARCHAR(100) |
| priority | VARCHAR(20) |
| deadline | DATE |
| status | VARCHAR(20) |

---

## 📷 Screenshots

> Add screenshots of:

- Dashboard
- Pending Tasks
- Completed Tasks
- Task Details
- Add Task
- Edit Task

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/TaskNest.git
```

---

### Navigate into Project

```bash
cd TaskNest
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure MySQL

Create a MySQL database and import the `tasks` table.

Update your database credentials inside:

```javascript
server.js
```

Example:

```javascript
host: "localhost",
user: "root",
password: "your_password",
database: "tasknest"
```

---

### Run the Server

```bash
nodemon server.js
```

or

```bash
node server.js
```

---

### Open in Browser

```
http://localhost:3000
```

---

## 📈 Future Enhancements

- User Authentication
- Dark Mode
- Calendar View
- Drag & Drop Task Management
- Email Reminders
- Task Categories
- Charts & Analytics
- Notifications
- Mobile App Version

---

## 🎯 Learning Outcomes

This project demonstrates:

- Full Stack Development
- REST API Development
- CRUD Operations
- Database Integration
- Express.js
- MySQL
- DOM Manipulation
- Asynchronous JavaScript (Fetch API)
- Responsive UI Design
- Frontend-Backend Integration

---

## 👩‍💻 Author

**Khushi**

Final Year B.Tech (Computer Science & Engineering - Artificial Intelligence)

Passionate about building user-centric full-stack web applications and continuously learning modern software development technologies.

---

## 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and improve it.

---

⭐ If you found this project useful, consider giving it a star on GitHub!
