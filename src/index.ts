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


