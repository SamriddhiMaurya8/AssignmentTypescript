
// working  

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


//adding tags for filtering the content 

const categoryDropdown = document.getElementById('select-categories-divv') as HTMLSelectElement;
const tagContainer = document.querySelector('.input-containerr') as HTMLDivElement;

function addTag() {
    const selectedCategory = categoryDropdown.value.trim();

    if (selectedCategory) {
      
        const tagElement = document.createElement("div");
        tagElement.className = "cate-item";
        tagElement.innerHTML = `${selectedCategory} <span class="tag-remove">×</span>`;

       
        const removeTag = tagElement.querySelector(".tag-remove") as HTMLSpanElement;
        removeTag.addEventListener("click", () => {
            tagContainer.removeChild(tagElement);
            filterTasksByTags();
        });

 
        tagContainer.appendChild(tagElement);

        categoryDropdown.value = "";

        filterTasksByTags() ; 
    }
}

categoryDropdown.addEventListener('change', addTag);









//actual filtering is done here


function filterTasksByTags() {
    const selectedTags: string[] = [];

    const tagElements = tagContainer.querySelectorAll('.cate-item');
    
    
    for (let i = 0; i < tagElements.length; i++) {
        const tagElement = tagElements[i] as HTMLElement;
        const tagText = tagElement.textContent?.split(' ×')[0].trim().toLowerCase() || '';
        selectedTags.push(tagText);
    }
    
    const tasks = document.querySelectorAll(".task-one");


    tasks.forEach(taskElement => {
        const taskEl = taskElement as HTMLElement;

        const taskTags: string[] = [];
        const tagElements = taskEl.querySelectorAll('.tags .tag');
        
      
        for (let j = 0; j < tagElements.length; j++) {
            const tagElement = tagElements[j] as HTMLElement;
            const tagText = tagElement.textContent?.trim().toLowerCase() || '';
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









