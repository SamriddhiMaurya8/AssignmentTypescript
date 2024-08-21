var taskTitle = document.getElementById("task-title");
var description = document.getElementById("description");
var addBtn = document.querySelector(".btn");
addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (taskTitle) {
        var titleValue = taskTitle.value;
        console.log(titleValue);
    }
    else {
        console.error(" not found");
    }
    if (description) {
        var descriptionVal = description.value;
        console.log(descriptionVal);
    }
    else {
        console.error(" not found");
    }
});
var categorySelect = document.getElementById("Category");
var selectedOptions = document.getElementById("selected-options");
categorySelect.addEventListener("change", function () {
    var selectedValue = categorySelect.value;
    var selectedText = categorySelect.options[categorySelect.selectedIndex].text;
    // console.log(selectedText);
    var option = document.getElementById('option');
    var optionDiv = document.createElement("div");
    optionDiv.textContent = selectedText;
    //   option.appendChild(optionDiv) ; 
    var removeBtn = document.createElement("span");
    removeBtn.textContent = " ×";
    removeBtn.style.cursor = "pointer";
    optionDiv.appendChild(removeBtn);
    selectedOptions.appendChild(optionDiv);
    categorySelect.value = " ";
    removeBtn.addEventListener("click", function () {
        selectedOptions.removeChild(optionDiv);
    });
});
// categorySelect.addEventListener('change', ()=> {
//     const selectedValue = categorySelect.value;
//     const selectedText = categorySelect.options[categorySelect.selectedIndex].text;
//     const optionDiv = document.createElement('div');
//     optionDiv.textContent = selectedText;
//     const removeBtn = document.createElement('span');
//     removeBtn.textContent = ' ×';
//     removeBtn.style.cursor = 'pointer';
//     optionDiv.appendChild(removeBtn);
//     selectedOptions.appendChild(optionDiv);
//     categorySelect.value = "";
//     removeBtn.addEventListener('click', function() {
//         selectedOptions.removeChild(optionDiv);
//     });
// });
