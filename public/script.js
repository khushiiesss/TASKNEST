console.log("Frontend connected successfully!");

let currentPageTasks = [];
let currentContainer = null;

// -------------------- FETCH ALL TASKS --------------------

fetch("/tasks")
  .then((response) => response.json())
  .then((tasks) => {
    const pendingTasks = tasks.filter((task) => task.status === "Pending");
    const completedTasks = tasks.filter((task) => task.status === "Completed");
    updateDashboardStats(tasks, pendingTasks, completedTasks);

    const pendingContainer = document.getElementById("pendingTasks");
    const completedContainer = document.getElementById("completedTasks");

    if (pendingContainer) {
      currentPageTasks = pendingTasks;
      currentContainer = pendingContainer;
      displayTasks(currentPageTasks, currentContainer);

      const pendingSearch = document.getElementById("pendingSearch");

      if (pendingSearch) {
        pendingSearch.addEventListener("input", function () {
          const searchValue = pendingSearch.value.toLowerCase();
          const filteredTasks = pendingTasks.filter((task) => {
            return (
           task.title.toLowerCase().includes(searchValue) ||
          (task.subject && task.subject.toLowerCase().includes(searchValue)) ||
          (task.description && task.description.toLowerCase().includes(searchValue))
        );
      });

      displayTasks(filteredTasks, pendingContainer);
    });
  }
}

if (completedContainer) {
  currentPageTasks = completedTasks;
  currentContainer = completedContainer;
  displayTasks(currentPageTasks, currentContainer);
}

  const completedSearch = document.getElementById("completedSearch");

  if (completedSearch) {
    completedSearch.addEventListener("input", function () {
      const searchValue = completedSearch.value.toLowerCase();

      const filteredTasks = completedTasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(searchValue) ||
          (task.subject && task.subject.toLowerCase().includes(searchValue)) ||
          (task.description && task.description.toLowerCase().includes(searchValue))
        );
      });

      displayTasks(filteredTasks, completedContainer);
    });
  }
}
  })
  .catch((error) => {
    console.error("Error fetching tasks:", error);
  });

// -------------------- DISPLAY TASK CARDS --------------------

function displayTasks(tasks, container) {
  container.innerHTML = "";

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-[2rem] p-8 shadow-xl text-center">
        <p class="text-ink/60 text-lg font-semibold">
          No tasks found.
        </p>
      </div>
    `;
    return;
  }

  tasks.forEach((task) => {
    container.innerHTML += `
      <a href="task.html?id=${task.id}"
        class="group bg-white rounded-[2rem] p-7 shadow-xl border border-coffee/10 hover:-translate-y-2 transition block">

        <div class="flex justify-between items-center">
          <span class="bg-sand text-coffee px-4 py-2 rounded-full text-sm font-bold">
            ${task.status}
          </span>

          <span class="text-coffee font-extrabold">
            #${String(task.id).padStart(3, "0")}
          </span>
        </div>

        <h3 class="text-2xl font-extrabold mt-6 group-hover:text-coffee transition">
          ${task.title}
        </h3>

        <p class="mt-4 text-ink/60">
          ${task.description || "No description added."}
        </p>

        <div class="mt-8 grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-ink/50">Subject</p>
            <p class="font-bold">${task.subject || "Not specified"}</p>
          </div>

          <div>
            <p class="text-sm text-ink/50">Priority</p>
            <p class="font-bold ${getPriorityColor(task.priority)}">
              ${task.priority || "Not set"}
            </p>
          </div>

          <div>
            <p class="text-sm text-ink/50">Deadline</p>
            <p class="font-bold">${formatDate(task.deadline)}</p>
          </div>

          <div>
            <p class="text-sm text-ink/50">Status</p>
            <p class="font-bold">${task.status}</p>
          </div>
        </div>

        <p class="mt-8 font-extrabold text-coffee group-hover:translate-x-2 transition inline-block">
          View Details →
        </p>
      </a>
    `;
  });
}

// -------------------- TASK DETAILS PAGE --------------------

const taskDetailsContainer = document.getElementById("taskDetails");

if (taskDetailsContainer) {
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("id");

  fetch(`/tasks/${taskId}`)
    .then((response) => response.json())
    .then((task) => {
      taskDetailsContainer.innerHTML = `
        <div class="bg-white rounded-[2rem] shadow-2xl p-10">

          <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div>
              <p class="text-sm font-bold text-coffee">
                Task #${String(task.id).padStart(3, "0")}
              </p>

              <h1 class="text-4xl md:text-5xl font-extrabold mt-3 text-ink">
                ${task.title}
              </h1>

              <p class="mt-4 text-ink/60 text-lg max-w-3xl">
                ${task.description || "No description added."}
              </p>
            </div>

            <span class="inline-flex bg-sand text-coffee px-5 py-3 rounded-full font-bold">
              ${task.status}
            </span>
          </div>

          <hr class="my-10 border-coffee/10">

          <h2 class="text-2xl font-extrabold mb-8 text-coffee">
            Task Information
          </h2>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-ink/50">Subject</p>
              <p class="font-bold text-xl">${task.subject || "Not specified"}</p>
            </div>

            <div>
              <p class="text-ink/50">Priority</p>
              <p class="font-bold text-xl ${getPriorityColor(task.priority)}">
                ${task.priority || "Not set"}
              </p>
            </div>

            <div>
              <p class="text-ink/50">Deadline</p>
              <p class="font-bold text-xl">${formatDate(task.deadline)}</p>
            </div>

            <div>
              <p class="text-ink/50">Status</p>
              <p class="font-bold text-xl">${task.status}</p>
            </div>
          </div>

          <hr class="my-10 border-coffee/10">

          <h2 class="text-2xl font-extrabold mb-4 text-coffee">
            Description
          </h2>

          <p class="leading-8 text-lg text-ink/70">
            ${task.description || "No description added."}
          </p>

          <div class="mt-12 flex flex-wrap gap-5">
            
            <a href="edit-task.html?id=${task.id}"
              class="px-8 py-4 rounded-full bg-coffee text-white font-bold hover:bg-mocha transition">
              ✏ Edit Task
            </a>
            

            <button
              onclick="deleteTask(${task.id})"
              class="px-8 py-4 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition">
              🗑 Delete Task
            </button>
          </div>

        </div>
      `;
    })
    .catch((error) => {
      taskDetailsContainer.innerHTML = `
        <div class="bg-white rounded-[2rem] shadow-xl p-10 text-center">
          <h2 class="text-3xl font-bold text-red-500">
            Failed to load task details.
          </h2>
        </div>
      `;
      console.error(error);
    });
}

// -------------------- DELETE TASK --------------------

window.deleteTask = function (id) {
  console.log("Delete clicked:", id);

  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) return;

  fetch(`/tasks/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    });
};

// -------------------- HELPER FUNCTIONS --------------------

function formatDate(dateValue) {
  if (!dateValue) return "No deadline";

  const date = new Date(dateValue);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getPriorityColor(priority) {
  if (priority === "High") return "text-red-600";
  if (priority === "Medium") return "text-orange-600";
  if (priority === "Low") return "text-green-600";

  return "text-coffee";
}



const editTaskForm = document.getElementById("editTaskForm");

if (editTaskForm) {
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("id");

  fetch(`/tasks/${taskId}`)
    .then((response) => response.json())
    .then((task) => {
      document.getElementById("title").value = task.title || "";
      document.getElementById("description").value = task.description || "";
      document.getElementById("subject").value = task.subject || "";
      document.getElementById("priority").value = task.priority || "Medium";

      if (task.deadline) {
        document.getElementById("deadline").value = task.deadline.split("T")[0];
      }

      document.getElementById("status").value = task.status || "Pending";
    });

  editTaskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const updatedTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      subject: document.getElementById("subject").value,
      priority: document.getElementById("priority").value,
      deadline: document.getElementById("deadline").value,
      status: document.getElementById("status").value
    };

    fetch(`/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.href = `task.html?id=${taskId}`;
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("Failed to update task.");
      });
  });
}


// =========================
// ADD TASK
// =========================

const taskForm = document.getElementById("taskForm");

if (taskForm) {

    taskForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const newTask = {

            title: document.getElementById("title").value.trim(),

            subject: document.getElementById("subject").value.trim(),

            description: document.getElementById("description").value.trim(),

            priority: document.getElementById("priority").value,

            status: document.getElementById("status").value,

            deadline: document.getElementById("deadline").value

        };

        fetch("/tasks", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(newTask)

        })

        .then(response => {

            if (!response.ok) {

                throw new Error("Failed to add task");

            }

            return response.json();

        })

        .then(data => {

            alert("✅ Task added successfully!");

            taskForm.reset();

            window.location.href = "pending.html";

        })

        .catch(error => {

            console.error(error);

            alert("❌ Failed to add task.");

        });

    });

}



function updateDashboardStats(tasks, pendingTasks, completedTasks) {
  const totalTasksCount = document.getElementById("totalTasksCount");
  const pendingTasksCount = document.getElementById("pendingTasksCount");
  const completedTasksCount = document.getElementById("completedTasksCount");

  if (totalTasksCount) {
    totalTasksCount.textContent = tasks.length;
  }

  if (pendingTasksCount) {
    pendingTasksCount.textContent = pendingTasks.length;
  }

  if (completedTasksCount) {
    completedTasksCount.textContent = completedTasks.length;
  }
}




window.filterTasks = function (priority) {
  if (!currentContainer) return;

  if (priority === "All") {
    displayTasks(currentPageTasks, currentContainer);
    return;
  }

  const filteredTasks = currentPageTasks.filter(
    (task) => task.priority === priority
  );

  displayTasks(filteredTasks, currentContainer);
};