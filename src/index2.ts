
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





