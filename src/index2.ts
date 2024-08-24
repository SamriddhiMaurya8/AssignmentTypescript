
// correct 

// add tags to input container while taking input 
const selectElement = document.getElementById('select-categories-div') as HTMLSelectElement;
const inputContainer = document.querySelector('.input-container') as HTMLDivElement;

function addCategories() {
    const selectedValue = selectElement.value.trim();

    if (selectedValue && selectedValue !== "") {
        const item = document.createElement("div");
        item.className = "cate-item";
        item.innerHTML = `${selectedValue} <span class="tag-remove">×</span>`;

        const tagCross = item.querySelector(".tag-remove") as HTMLSpanElement; 
    
        tagCross.addEventListener("click", () => {
            inputContainer.removeChild(item);
        });

        inputContainer.appendChild(item);

        
        selectElement.value = "";
    }
}

selectElement.addEventListener('change', addCategories);



// Select the dropdown and input container elements
const categoryDropdown = document.getElementById('select-categories-divv') as HTMLSelectElement;
const tagContainer = document.querySelector('.input-containerr') as HTMLDivElement;

// Function to add selected categories as tags
function addTag() {
    const selectedCategory = categoryDropdown.value.trim();

    if (selectedCategory) {
        // Create a new div for the tag
        const tagElement = document.createElement("div");
        tagElement.className = "cate-item";
        tagElement.innerHTML = `${selectedCategory} <span class="tag-remove">×</span>`;

        // Add click event to the remove button
        const removeTag = tagElement.querySelector(".tag-remove") as HTMLSpanElement;
        removeTag.addEventListener("click", () => {
            tagContainer.removeChild(tagElement);
        });

        // Append the tag to the container
        tagContainer.appendChild(tagElement);

        // Reset the dropdown to default option
        categoryDropdown.value = "";
    }
}

// Add event listener to the dropdown for the change event
categoryDropdown.addEventListener('change', addTag);
