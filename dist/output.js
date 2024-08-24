"use strict";
const taskTitle = document.getElementById("task-title");
const description = document.getElementById("description");
const addBtn = document.querySelector(".btn");
const priority = document.getElementById("priority");
const dateJS = document.getElementById("date");
const taskContainer = document.querySelector(".task-div");
const searchBox = document.querySelector(".search-box");
const progressFilter = document.querySelector(".progress");
const priorityDropdown = document.querySelector(".priority-second");
//  save tasks to local storage
function saveTasksToLocalStorage() {
    var _a, _b, _c, _d;
    const tasks = [];
    const taskElements = taskContainer.querySelectorAll(".task-one");
    for (let i = 0; i < taskElements.length; i++) {
        const taskElement = taskElements[i];
        const taskName = ((_a = taskElement.querySelector(".task-name")) === null || _a === void 0 ? void 0 : _a.textContent) || "";
        const taskDescription = ((_b = taskElement.querySelector(".desc")) === null || _b === void 0 ? void 0 : _b.textContent) || "";
        const taskDate = ((_c = taskElement.querySelector(".date")) === null || _c === void 0 ? void 0 : _c.textContent) || "";
        const taskPriority = ((_d = taskElement.querySelector(".priorityBottom")) === null || _d === void 0 ? void 0 : _d.textContent) || "";
        const taskTags = [];
        const tags = taskElement.querySelectorAll(".tags .tag");
        for (let j = 0; j < tags.length; j++) {
            taskTags.push(tags[j].textContent || "");
        }
        const checkbox = taskElement.querySelector(".checkBox");
        const isChecked = checkbox.checked;
        tasks.push({
            taskName,
            taskDescription,
            taskDate,
            taskPriority,
            taskTags,
            isChecked,
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//load task from local storage 
function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (let i = 0; i < savedTasks.length; i++) {
        const task = savedTasks[i];
        createTasks(task.taskName, task.taskDescription, task.taskDate, task.taskPriority, task.taskTags, task.isChecked);
    }
}
function createTasks(name, desc, dateValue, priorityValue, tags, isChecked) {
    const taskOneDiv = document.createElement("div");
    taskOneDiv.classList.add("task-one");
    const leftSideDiv = document.createElement("div");
    leftSideDiv.classList.add("left-side");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkBox");
    checkbox.checked = isChecked || false;
    leftSideDiv.appendChild(checkbox);
    const rightSideDiv = document.createElement("div");
    rightSideDiv.classList.add("right-side");
    const taskName = document.createElement("h3");
    taskName.classList.add("task-name");
    taskName.textContent = name || taskTitle.value;
    const dateTime = document.createElement("p");
    dateTime.classList.add("date-time");
    const calenderDate = new Date(dateValue || dateJS.value);
    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = `${calenderDate.toDateString()}  |`;
    const now = new Date();
    const time = document.createElement("div");
    time.classList.add("time");
    const hour = now.getHours();
    let minutes = now.getMinutes();
    minutes < 10 ? "0" + minutes : minutes;
    let greet = "";
    if (hour < 12) {
        greet = "morning";
    }
    else if (hour >= 12 && hour < 16) {
        greet = "afternoon";
    }
    else if (hour >= 16 && hour < 18) {
        greet = "evening";
    }
    else {
        greet = "night";
    }
    time.textContent = `${hour}:${minutes} in the ${greet} |`;
    const priorityBottom = document.createElement("div");
    priorityBottom.classList.add("priorityBottom");
    priorityBottom.textContent = priorityValue || `${priority.value} Priority`;
    dateTime.appendChild(date);
    dateTime.appendChild(time);
    dateTime.appendChild(priorityBottom);
    dateTime.style.display = "flex";
    dateTime.style.gap = "10px";
    if ((priorityValue || priority.value) === "Low") {
        dateTime.style.color = "green";
    }
    else if ((priorityValue || priority.value) === "Medium") {
        dateTime.style.color = "#E4971A";
    }
    else {
        dateTime.style.color = "red";
    }
    const tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tags");
    // const tag1 = document.createElement("div");
    // tag1.classList.add("tag1");
    // tag1.textContent = tags ? tags[0] : "Work";
    // const tag2 = document.createElement("div");
    // tag2.classList.add("tag2");
    // tag2.textContent = tags ? tags[1] : "Personal";
    // tagsDiv.appendChild(tag1);
    // tagsDiv.appendChild(tag2);
    //   const inputTags = inputContainer.querySelectorAll(".cate-item");
    //   inputTags.forEach(tagElement => {
    //       const tagText = (tagElement as HTMLElement).textContent?.split(' ×')[0] || "";
    //       const tagDiv = document.createElement("div");
    //       tagDiv.classList.add("tag");
    //       tagDiv.textContent = tagText;
    //       tagsDiv.appendChild(tagDiv);
    //   });
    if (tags && tags.length > 0) {
        tags.forEach(tag => {
            const tagDiv = document.createElement("div");
            tagDiv.classList.add("tag");
            tagDiv.textContent = tag;
            tagsDiv.appendChild(tagDiv);
        });
    }
    else {
        const inputTags = inputContainer.querySelectorAll(".cate-item");
        inputTags.forEach(tagElement => {
            var _a;
            const tagText = ((_a = tagElement.textContent) === null || _a === void 0 ? void 0 : _a.split(' ×')[0]) || "";
            const tagDiv = document.createElement("div");
            tagDiv.classList.add("tag");
            tagDiv.textContent = tagText;
            tagsDiv.appendChild(tagDiv);
        });
    }
    const descriptionText = document.createElement("p");
    descriptionText.classList.add("desc");
    descriptionText.textContent = desc || description.value;
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
        saveTasksToLocalStorage();
    });
    checkbox.addEventListener("change", function () {
        if (this.checked) {
            taskName.style.textDecoration = "line-through";
        }
        else {
            taskName.style.textDecoration = "none";
        }
        saveTasksToLocalStorage();
    });
    if (isChecked) {
        taskName.style.textDecoration = "line-through";
    }
    else {
        taskName.style.textDecoration = "none";
    }
}
function sortTasksByPriority(order) {
    const taskContainer = document.querySelector(".task-div");
    if (!taskContainer) {
        console.error("Task container not found");
        return;
    }
    const taskElements = Array.from(taskContainer.querySelectorAll(".task-one"));
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    taskElements.sort((a, b) => {
        var _a, _b, _c, _d, _e, _f;
        const priorityA = (((_b = (_a = a.querySelector(".priorityBottom")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().replace(' Priority', '')) || "Low");
        const priorityB = (((_d = (_c = b.querySelector(".priorityBottom")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim().replace(' Priority', '')) || "Low");
        const priorityAValue = (_e = priorityMap[priorityA]) !== null && _e !== void 0 ? _e : 0;
        const priorityBValue = (_f = priorityMap[priorityB]) !== null && _f !== void 0 ? _f : 0;
        return priorityAValue - priorityBValue;
    });
    if (order === "LowToHigh") {
        taskElements.reverse();
    }
    taskContainer.innerHTML = "";
    taskElements.forEach(task => taskContainer.appendChild(task));
}
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
});
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const tags = Array.from(inputContainer.querySelectorAll(".cate-item"))
        .map(tag => { var _a; return ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.split(' ×')[0]) || ""; });
    createTasks();
    saveTasksToLocalStorage();
    taskTitle.value = '';
    description.value = '';
    dateJS.value = '';
    priority.value = 'Low';
});
priorityDropdown.addEventListener("change", function () {
    const selectedValue = priorityDropdown.value;
    if (selectedValue === "HighToLow" || selectedValue === "LowToHigh") {
        sortTasksByPriority(selectedValue);
    }
});
searchBox.addEventListener("input", function () {
    filterTasks();
});
progressFilter.addEventListener("change", function () {
    filterTasks();
});
function filterTasks() {
    const searchText = searchBox.value.toLowerCase();
    const filterValue = progressFilter.value;
    const tasks = document.querySelectorAll(".task-one");
    tasks.forEach((taskElement) => {
        var _a, _b, _c, _d;
        const taskEl = taskElement;
        const taskName = ((_b = (_a = taskEl.querySelector(".task-name")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
        const taskDescription = ((_d = (_c = taskEl.querySelector(".desc")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || "";
        const checkbox = taskEl.querySelector(".checkBox");
        const matchesSearch = searchText === "" || taskName.includes(searchText) || taskDescription.includes(searchText);
        let matchesFilter = true;
        if (filterValue === "completed") {
            matchesFilter = checkbox.checked;
        }
        else if (filterValue === "incomplete") {
            matchesFilter = !checkbox.checked;
        }
        if (matchesSearch && matchesFilter) {
            taskEl.style.display = "flex";
        }
        else {
            taskEl.style.display = "none";
        }
    });
}
// correct 
// add tags to input container while taking input 
const selectElement = document.getElementById('select-categories-div');
const inputContainer = document.querySelector('.input-container');
function addCategories() {
    const selectedValue = selectElement.value.trim();
    if (selectedValue && selectedValue !== "") {
        const item = document.createElement("div");
        item.className = "cate-item";
        item.innerHTML = `${selectedValue} <span class="tag-remove">×</span>`;
        const tagCross = item.querySelector(".tag-remove");
        tagCross.addEventListener("click", () => {
            inputContainer.removeChild(item);
        });
        inputContainer.appendChild(item);
        selectElement.value = "";
    }
}
selectElement.addEventListener('change', addCategories);
// const taskTitle = document.getElementById("task-title") as HTMLInputElement;
// const description = document.getElementById("description") as HTMLInputElement;
// const addBtn = document.querySelector(".btn") as HTMLButtonElement;
// const priority = document.getElementById("priority") as HTMLInputElement;
// const dateJS = document.getElementById("date") as HTMLInputElement;
// const taskContainer = document.querySelector(".task-div") as HTMLDivElement;
// const searchBox = document.querySelector(".search-box") as HTMLInputElement;
// const progressFilter = document.querySelector(".progress") as HTMLSelectElement;
// const priorityDropdown = document.querySelector(".priority-second") as HTMLSelectElement;
// // const selectElement = document.getElementById('select-categories-div') as HTMLSelectElement;
// // const inputContainer = document.querySelector('.input-container') as HTMLDivElement;
// //  save tasks to local storage
// function saveTasksToLocalStorage() {
//   const tasks: any[] = [];
//   const taskElements = taskContainer.querySelectorAll(".task-one");
//   for (let i = 0; i < taskElements.length; i++) {
//     const taskElement = taskElements[i] as HTMLElement;
//     const taskName = taskElement.querySelector(".task-name")?.textContent || "";
//     const taskDescription = taskElement.querySelector(".desc")?.textContent || "";
//     const taskDate = taskElement.querySelector(".date")?.textContent || "";
//     const taskPriority = taskElement.querySelector(".priorityBottom")?.textContent || "";
//     const taskTags: string[] = [];
//     const tags = taskElement.querySelectorAll(".tags div");
//     for (let j = 0; j < tags.length; j++) {
//       taskTags.push(tags[j].textContent || "");
//     }
//     const checkbox = taskElement.querySelector(".checkBox") as HTMLInputElement;
//     const isChecked = checkbox.checked;
//     tasks.push({
//       taskName,
//       taskDescription,
//       taskDate,
//       taskPriority,
//       taskTags,
//       isChecked,
//     });
//   }
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }
// function loadTasksFromLocalStorage() {
//   const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
//   for (let i = 0; i < savedTasks.length; i++) {
//     const task = savedTasks[i];
//     createTasks(
//       task.taskName,
//       task.taskDescription,
//       task.taskDate,
//       task.taskPriority,
//       task.taskTags ,
//       task.isChecked
//     );
//   }
// }
// function createTasks(name?: string, desc?: string, dateValue?: string, priorityValue?: string, tags?: string,  isChecked?: boolean) {
//   const taskOneDiv = document.createElement("div");
//   taskOneDiv.classList.add("task-one");
//   const leftSideDiv = document.createElement("div");
//   leftSideDiv.classList.add("left-side");
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.classList.add("checkBox");
//   checkbox.checked = isChecked || false;
//   leftSideDiv.appendChild(checkbox);
//   const rightSideDiv = document.createElement("div");
//   rightSideDiv.classList.add("right-side");
//   const taskName = document.createElement("h3");
//   taskName.classList.add("task-name");
//   taskName.textContent = name || taskTitle.value;
//   const dateTime = document.createElement("p");
//   dateTime.classList.add("date-time");
//   const calenderDate = new Date(dateValue || dateJS.value);
//   const date = document.createElement("div");
//   date.classList.add("date");
//   date.textContent = `${calenderDate.toDateString()}  |`;
//   const now = new Date();
//   const time = document.createElement("div");
//   time.classList.add("time");
//   const hour = now.getHours();
//   let minutes = now.getMinutes();
//   minutes < 10 ? "0" + minutes : minutes;
//   let greet = "";
//   if (hour < 12) {
//     greet = "morning";
//   } else if (hour >= 12 && hour < 16) {
//     greet = "afternoon";
//   } else if (hour >= 16 && hour < 18) {
//     greet = "evening";
//   } else {
//     greet = "night";
//   }
//   time.textContent = `${hour}:${minutes} in the ${greet} |`;
//   const priorityBottom = document.createElement("div");
//   priorityBottom.classList.add("priorityBottom");
//   priorityBottom.textContent = priorityValue || `${priority.value} Priority`;
//   dateTime.appendChild(date);
//   dateTime.appendChild(time);
//   dateTime.appendChild(priorityBottom);
//   dateTime.style.display = "flex";
//   dateTime.style.gap = "10px";
//   if ((priorityValue || priority.value) === "Low") {
//     dateTime.style.color = "green";
//   } else if ((priorityValue || priority.value) === "Medium") {
//     dateTime.style.color = "#E4971A";
//   } else {
//     dateTime.style.color = "red";
//   }
//   const tagsDiv = document.createElement("div");
//   tagsDiv.classList.add("tags");
//   // const tag1 = document.createElement("div");
//   // tag1.classList.add("tag1");
//   // tag1.textContent = tags ? tags[0] : "Work";
//   // const tag2 = document.createElement("div");
//   // tag2.classList.add("tag2");
//   // tag2.textContent = tags ? tags[1] : "Personal";
//   // tagsDiv.appendChild(tag1);
//   // tagsDiv.appendChild(tag2);
//   const inputTags = inputContainer.querySelectorAll(".cate-item");
//   inputTags.forEach(tagElement => {
//       const tagText = (tagElement as HTMLElement).textContent?.split(' ×')[0] || "";
//       const tagDiv = document.createElement("div");
//       tagDiv.classList.add("tag");
//       tagDiv.textContent = tagText;
//       tagsDiv.appendChild(tagDiv);
//   });
//   const descriptionText = document.createElement("p");
//   descriptionText.classList.add("desc");
//   descriptionText.textContent = desc || description.value;
//   const cornerDiv = document.createElement("div");
//   cornerDiv.classList.add("cornerDiv");
//   const trashImg = document.createElement("img");
//   trashImg.classList.add("trash-icon");
//   trashImg.src = "Trash.png";
//   trashImg.style.width = "20px";
//   trashImg.style.height = "20px";
//   cornerDiv.appendChild(trashImg);
//   rightSideDiv.appendChild(taskName);
//   rightSideDiv.appendChild(dateTime);
//   rightSideDiv.appendChild(tagsDiv);
//   rightSideDiv.appendChild(descriptionText);
//   taskOneDiv.appendChild(leftSideDiv);
//   taskOneDiv.appendChild(rightSideDiv);
//   taskOneDiv.appendChild(cornerDiv);
//   taskContainer.appendChild(taskOneDiv);
//   trashImg.addEventListener("click", function () {
//     taskOneDiv.remove();
//     saveTasksToLocalStorage();
//   });
//   checkbox.addEventListener("change", function () {
//     if (this.checked) {
//       taskName.style.textDecoration = "line-through";
//     } else {
//       taskName.style.textDecoration = "none";
//     }
//     saveTasksToLocalStorage();
//   });
//   if (isChecked) {
//     taskName.style.textDecoration = "line-through";
//   } else {
//     taskName.style.textDecoration = "none";
//   }
// }
// function sortTasksByPriority(order: string) {
//     const taskContainer = document.querySelector(".task-div");
//     if (!taskContainer) {
//       console.error("Task container not found");
//       return;
//     }
//     const taskElements = Array.from(taskContainer.querySelectorAll(".task-one"));
//     const priorityMap: { [key: string]: number } = { Low: 1, 
//                                                      Medium: 2, 
//                                                      High: 3 };
//     taskElements.sort((a, b) => {
//       const priorityA = (a.querySelector(".priorityBottom")?.textContent?.trim().replace(' Priority', '') || "Low") as keyof typeof priorityMap;
//       const priorityB = (b.querySelector(".priorityBottom")?.textContent?.trim().replace(' Priority', '') || "Low") as keyof typeof priorityMap;
//       const priorityAValue = priorityMap[priorityA] ?? 0;
//       const priorityBValue = priorityMap[priorityB] ?? 0;
//       return priorityAValue - priorityBValue;
//     });
//     if (order === "LowToHigh") {
//       taskElements.reverse();
//     }
//     taskContainer.innerHTML = "";
//     taskElements.forEach(task => taskContainer.appendChild(task));
//   }
// document.addEventListener("DOMContentLoaded", () => {
//   loadTasksFromLocalStorage();
// });
// addBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   createTasks();
//   saveTasksToLocalStorage();
//   taskTitle.value = '';
//   description.value = '';
//   dateJS.value = '';
//   priority.value = 'Low';
// });
//   priorityDropdown.addEventListener("change", function () {
//   const selectedValue = priorityDropdown.value;
//   if (selectedValue === "HighToLow" || selectedValue === "LowToHigh") {
//     sortTasksByPriority(selectedValue);
//   }
// });
//   searchBox.addEventListener("input", function () {
//     filterTasks(); 
//   });
//   progressFilter.addEventListener("change", function () {
//     filterTasks(); 
//   });
//   function filterTasks() {
//     const searchText = searchBox.value.toLowerCase(); 
//     const filterValue = progressFilter.value; 
//     const tasks = document.querySelectorAll(".task-one"); 
//     tasks.forEach((taskElement) => {
//       const taskEl = taskElement as HTMLElement; 
//       const taskName = taskEl.querySelector(".task-name")?.textContent?.toLowerCase() || "";
//       const taskDescription = taskEl.querySelector(".desc")?.textContent?.toLowerCase() || "";
//       const checkbox = taskEl.querySelector(".checkBox") as HTMLInputElement;
//       const matchesSearch = searchText === "" || taskName.includes(searchText) || taskDescription.includes(searchText);
//       let matchesFilter = true; 
//       if (filterValue === "completed") {
//         matchesFilter = checkbox.checked;
//       } else if (filterValue === "incomplete") {
//         matchesFilter = !checkbox.checked;
//       }
//       if (matchesSearch && matchesFilter) {
//         taskEl.style.display = "flex";
//       } else {
//         taskEl.style.display = "none";
//       }
//     });
//   }
