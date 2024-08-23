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
document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    var prioritySelect = document.querySelector('.priority-second');
    // const taskContainer = document.querySelector('.task-div') as HTMLDivElement | null;
    // Check if elements are found
    if (!prioritySelect || !taskContainer) {
        console.error('Priority select or task container not found.');
        return;
    }
    // Define priority levels with numeric values for sorting
    var priorityLevels = {
        'High': 1,
        'Medium': 2,
        'Low': 3
    };
    function sortTasks(order) {
        // Convert child elements to array
        var tasks = Array.from(taskContainer.children);
        // Function to get priority level
        var getPriority = function (element) {
            var _a, _b, _c;
            var textContent = (_a = element.querySelector('.date-time')) === null || _a === void 0 ? void 0 : _a.textContent;
            var priorityText = ((_b = textContent === null || textContent === void 0 ? void 0 : textContent.split('|').pop()) === null || _b === void 0 ? void 0 : _b.trim()) || 'Medium'; // Default to Medium if text is empty
            return (_c = priorityLevels[priorityText]) !== null && _c !== void 0 ? _c : priorityLevels['Medium']; // Default to Medium if priorityText is not found
        };
        tasks.sort(function (a, b) {
            var aPriority = getPriority(a);
            var bPriority = getPriority(b);
            console.log("Comparing: " + aPriority + " vs " + bPriority); // Debug output
            if (order === 'HighToLow') {
                return aPriority - bPriority;
            }
            else { // LowToHigh
                return bPriority - aPriority;
            }
        });
        // Reorder tasks in the container
        tasks.forEach(function (task) { return taskContainer.appendChild(task); });
        console.log('Tasks sorted and reordered.');
    }
    // Add event listener to the priority select dropdown
    prioritySelect.addEventListener('change', function () {
        var selectedOrder = prioritySelect.value;
        console.log("Selected order: " + selectedOrder); // Debug output
        sortTasks(selectedOrder);
    });
});
