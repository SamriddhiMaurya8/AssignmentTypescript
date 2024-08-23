"use strict";
// const categorySelect = document.getElementById('Category') as HTMLSelectElement;
// const selectedOptions = document.getElementById('selected-options') as HTMLDivElement;
// categorySelect.addEventListener('change', function () {
//     const selectedText = categorySelect.options[categorySelect.selectedIndex]?.text;
//     const selectedValue = categorySelect.value;
//     if (selectedValue && selectedText) {
//         // Check if the tag already exists
//         if (![...selectedOptions.querySelectorAll('.tag')].some(tag => tag.textContent.includes(selectedText))) {
//             const tagDiv = document.createElement('div');
//             tagDiv.classList.add('tag');
//             tagDiv.textContent = selectedText;
//             const removeBtn = document.createElement('span');
//             removeBtn.textContent = ' ×';
//             removeBtn.classList.add('remove-tag');
//             removeBtn.addEventListener('click', function () {
//                 selectedOptions.removeChild(tagDiv);
//             });
//             tagDiv.appendChild(removeBtn);
//             selectedOptions.insertBefore(tagDiv, categorySelect.nextElementSibling); // Insert before select element
//             // Ensure no more than 5 tags
//             if (selectedOptions.querySelectorAll('.tag').length > 5) {
//                 selectedOptions.removeChild(selectedOptions.querySelector('.tag'));
//             }
//         }
//         // Clear the select value
//         categorySelect.value = '';
//     }
// });
const taskTitle = document.getElementById("task-title");
const description = document.getElementById("description");
const addBtn = document.querySelector(".btn");
const priority = document.getElementById("priority");
const dateJS = document.getElementById("date");
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
const taskContainer = document.querySelector(".task-div");
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
        }
        else {
            taskName.style.textDecoration = "none";
        }
    });
}
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("input", function () {
    const searchText = searchBox.value.toLowerCase();
    const tasks = document.querySelectorAll(".task-one");
    tasks.forEach((task) => {
        var _a, _b, _c, _d;
        const taskElement = task;
        const taskName = ((_b = (_a = taskElement.querySelector(".task-name")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
        const description = ((_d = (_c = taskElement.querySelector(".desc")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || "";
        if (taskName.includes(searchText) || description.includes(searchText)) {
            taskElement.style.display = "";
        }
        else {
            taskElement.style.display = "none";
        }
    });
});
const progressFilter = document.querySelector(".progress");
progressFilter === null || progressFilter === void 0 ? void 0 : progressFilter.addEventListener("change", () => {
    const filterValue = progressFilter.value;
    const tasks = document.querySelectorAll(".task-one");
    for (let i = 0; i < tasks.length; i++) {
        const taskElement = tasks[i];
        const checkbox = taskElement.querySelector(".checkBox");
        if (filterValue === "completed") {
            if (checkbox.checked) {
                taskElement.style.display = "";
            }
            else {
                taskElement.style.display = "none";
            }
        }
        else if (filterValue === "incomplete") {
            if (!checkbox.checked) {
                taskElement.style.display = "";
            }
            else {
                taskElement.style.display = "none";
            }
        }
        else {
            taskElement.style.display = "";
        }
    }
});
