var taskTitle = document.getElementById('task-title');
var description = document.getElementById('description');
var addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (taskTitle) {
        var titleValue = taskTitle.value;
        console.log(titleValue);
    }
    else {
        console.error(' not found');
    }
    if (description) {
        var descriptionVal = description.value;
        console.log(descriptionVal);
    }
    else {
        console.error(' not found');
    }
});
