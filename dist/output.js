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
//function for creating the tasks dynamically 
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
//sorting of priority
function sortTasksByPriority(order) {
    if (!taskContainer) {
        console.error("Task container not found");
        return;
    }
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    const taskElements = Array.from(taskContainer.querySelectorAll(".task-one"));
    taskElements.sort((a, b) => {
        const getPriorityValue = (el) => {
            var _a, _b;
            const priorityText = ((_b = (_a = el.querySelector(".priorityBottom")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim().replace(' Priority', '')) || "Low";
            return priorityMap[priorityText] || 0;
        };
        const priorityAValue = getPriorityValue(a);
        const priorityBValue = getPriorityValue(b);
        return priorityAValue - priorityBValue;
    });
    if (order === "LowToHigh") {
        taskElements.reverse();
    }
    taskContainer.innerHTML = "";
    taskElements.forEach((task) => taskContainer.appendChild(task));
}
// document.addEventListener("DOMContentLoaded", () => {
//   loadTasksFromLocalStorage();
// });
addBtn.addEventListener("click", function (e) {
    var _a;
    e.preventDefault();
    const tags = [];
    const tagElements = inputContainer.querySelectorAll(".cate-item");
    for (let i = 0; i < tagElements.length; i++) {
        const tagElement = tagElements[i];
        const tagText = ((_a = tagElement.textContent) === null || _a === void 0 ? void 0 : _a.split(' ×')[0]) || "";
        tags.push(tagText);
    }
    createTasks();
    saveTasksToLocalStorage();
    taskTitle.value = '';
    description.value = '';
    dateJS.value = '';
    priority.value = 'Low';
    inputContainer.innerHTML = '';
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
//filter tasks acccording to search and priority
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
// working  
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
//adding tags for filtering the content 
const categoryDropdown = document.getElementById('select-categories-divv');
const tagContainer = document.querySelector('.input-containerr');
function addTag() {
    const selectedCategory = categoryDropdown.value.trim();
    if (selectedCategory) {
        const tagElement = document.createElement("div");
        tagElement.className = "cate-item";
        tagElement.innerHTML = `${selectedCategory} <span class="tag-remove">×</span>`;
        const removeTag = tagElement.querySelector(".tag-remove");
        removeTag.addEventListener("click", () => {
            tagContainer.removeChild(tagElement);
            filterTasksByTags();
        });
        tagContainer.appendChild(tagElement);
        categoryDropdown.value = "";
        filterTasksByTags();
    }
}
categoryDropdown.addEventListener('change', addTag);
//actual filtering is done here
function filterTasksByTags() {
    var _a;
    const selectedTags = [];
    const tagElements = tagContainer.querySelectorAll('.cate-item');
    for (let i = 0; i < tagElements.length; i++) {
        const tagElement = tagElements[i];
        const tagText = ((_a = tagElement.textContent) === null || _a === void 0 ? void 0 : _a.split(' ×')[0].trim().toLowerCase()) || '';
        selectedTags.push(tagText);
    }
    const tasks = document.querySelectorAll(".task-one");
    tasks.forEach(taskElement => {
        var _a;
        const taskEl = taskElement;
        const taskTags = [];
        const tagElements = taskEl.querySelectorAll('.tags .tag');
        for (let j = 0; j < tagElements.length; j++) {
            const tagElement = tagElements[j];
            const tagText = ((_a = tagElement.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) || '';
            taskTags.push(tagText);
        }
        const hasAllTags = selectedTags.length === 0 || selectedTags.every(tag => taskTags.indexOf(tag) !== -1);
        taskEl.style.display = hasAllTags ? 'flex' : 'none';
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
    filterTasksByTags();
});
