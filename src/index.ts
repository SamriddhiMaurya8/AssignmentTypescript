const taskTitle = document.getElementById("task-title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const addBtn = document.querySelector(".btn") as HTMLButtonElement;

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (taskTitle) {
    const titleValue = taskTitle.value;
    console.log(titleValue);
  } else {
    console.error(" not found");
  }
  if (description) {
    const descriptionVal = description.value;
    console.log(descriptionVal);
  } else {
    console.error(" not found");
  }
});

const categorySelect = document.getElementById("Category") as HTMLSelectElement;
const selectedOptions = document.getElementById(
  "selected-options"
) as HTMLDivElement;

categorySelect.addEventListener("change", () => {
  const selectedValue = categorySelect.value;
  const selectedText = categorySelect.options[categorySelect.selectedIndex].text;
  // console.log(selectedText);
  const option = document.getElementById('option')  as HTMLInputElement;
  const optionDiv = document.createElement("div");
  optionDiv.textContent = selectedText;

//   option.appendChild(optionDiv) ; 



  const removeBtn = document.createElement("span");
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
