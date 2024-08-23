const taskTitle = document.getElementById("task-title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const addBtn = document.querySelector(".btn") as HTMLButtonElement;
const priority = document.getElementById("priority") as HTMLInputElement;
const dateJS = document.getElementById("date") as HTMLInputElement;

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createTasks();
});

// const categorySelect = document.getElementById("Category") as HTMLSelectElement;
// const selectedOptions = document.getElementById(
//   "selected-options"
// ) as HTMLDivElement;

// categorySelect.addEventListener("change", () => {
//   const selectedText =
//     categorySelect.options[categorySelect.selectedIndex].text;

//   const optionDiv = document.createElement("div");
//   optionDiv.textContent = selectedText;

//   const removeBtn = document.createElement("span");
//   removeBtn.textContent = " ×";
//   removeBtn.style.cursor = "pointer";

//   optionDiv.appendChild(removeBtn);
//   selectedOptions.appendChild(optionDiv);

//   categorySelect.value = "";

//   removeBtn.addEventListener("click", function () {
//     selectedOptions.removeChild(optionDiv);
//   });
// });

const taskContainer = document.querySelector(".task-div") as HTMLDivElement;

function createTasks() {
  const taskOneDiv = document.createElement("div");
  taskOneDiv.classList.add("task-one");

  const leftSideDiv = document.createElement("div");
  leftSideDiv.classList.add("left-side");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkBox");
  leftSideDiv.appendChild(checkbox);

  const rightSideDiv = document.createElement("div");
  rightSideDiv.classList.add("right-side");

  const taskName = document.createElement("h3");
  taskName.classList.add("task-name");
  taskName.textContent = taskTitle.value;

  const dateTime = document.createElement("p");
  dateTime.classList.add("date-time");

  const date = document.createElement("div");
  date.classList.add("date");
  date.textContent = `${dateJS.value} |`;

  const now = new Date();
  const time = document.createElement("div");
  time.classList.add("time");
  const hour = now.getHours();
  const minutes = now.getMinutes();

  let greet = "";

  if (hour < 12) {
    greet = "morning";
  } else if (hour >= 12 && hour < 16) {
    greet = "afternoon";
  } else if (hour >= 16 && hour < 18) {
    greet = "evening";
  } else {
    greet = "night";
  }
  time.textContent = `${hour}:${minutes} in the ${greet} |`;

  const priorityBottom = document.createElement("div");
  priorityBottom.classList.add("priorityBottom");
  priorityBottom.textContent = `${priority.value} Priority`;

  dateTime.appendChild(date);
  dateTime.appendChild(time);
  dateTime.appendChild(priorityBottom);

  dateTime.style.display = "flex";
  dateTime.style.gap = "10px";

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("tags");

  const tag1 = document.createElement("div");
  tag1.classList.add("tag1");
  tag1.textContent = "Work";

  const tag2 = document.createElement("div");
  tag2.classList.add("tag2");
  tag2.textContent = "Personal";

  tagsDiv.appendChild(tag1);
  tagsDiv.appendChild(tag2);

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("desc");
  descriptionText.textContent = description.value;

  const cornerDiv = document.createElement("div");
  cornerDiv.classList.add("cornerDiv");

  const trashImg = document.createElement("img");
  trashImg.classList.add("trash-icon");
  trashImg.src = "Trash.png";
  trashImg.style.width = "20px";
  trashImg.style.height = "20px";

  cornerDiv.appendChild(trashImg);

  rightSideDiv.appendChild(taskName);
  rightSideDiv.appendChild(dateTime);
  rightSideDiv.appendChild(tagsDiv);
  rightSideDiv.appendChild(descriptionText);

  taskOneDiv.appendChild(leftSideDiv);
  taskOneDiv.appendChild(rightSideDiv);
  taskOneDiv.appendChild(cornerDiv);

  taskContainer.appendChild(taskOneDiv);

  trashImg.addEventListener("click", function () {
    taskOneDiv.remove();
  });

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      taskName.style.textDecoration = "line-through";
    } else {
      taskName.style.textDecoration = "none";
    }
  });
}

const searchBox = document.querySelector(".search-box") as HTMLInputElement;

searchBox.addEventListener("input", function () {
  const searchText = searchBox.value.toLowerCase();
  const tasks = document.querySelectorAll(".task-one");

  tasks.forEach((task) => {
    const taskElement = task as HTMLElement;
    const taskName =
      taskElement.querySelector(".task-name")?.textContent?.toLowerCase() || "";
    const description =
      taskElement.querySelector(".desc")?.textContent?.toLowerCase() || "";

    if (taskName.includes(searchText) || description.includes(searchText)) {
      taskElement.style.display = "";
    } else {
      taskElement.style.display = "none";
    }
  });
});

const progressFilter = document.querySelector(".progress") as HTMLSelectElement;

progressFilter?.addEventListener("change", () => {
  const filterValue = progressFilter.value;
  const tasks = document.querySelectorAll(".task-one");

  for (let i = 0; i < tasks.length; i++) {
    const taskElement = tasks[i] as HTMLElement;
    const checkbox = taskElement.querySelector(".checkBox") as HTMLInputElement;

    if (filterValue === "completed") {
      if (checkbox.checked) {
        taskElement.style.display = "";
      } else {
        taskElement.style.display = "none";
      }
    } else if (filterValue === "incomplete") {
      
      if (!checkbox.checked) {
        taskElement.style.display = "";
      } else {
        taskElement.style.display = "none";
      }
    } else {
      taskElement.style.display = "";
    }
  }
});



