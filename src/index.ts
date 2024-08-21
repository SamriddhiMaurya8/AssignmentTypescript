
    const taskTitle = document.getElementById('task-title') as HTMLInputElement;
    const description = document.getElementById('description') as HTMLInputElement ; 
    const addBtn = document.querySelector('.btn') as HTMLButtonElement;
    
    addBtn.addEventListener('click', function(e) {
      
      e.preventDefault();
      
      if (taskTitle) {
        const titleValue = taskTitle.value;
        console.log(titleValue); 
      } else {
        console.error(' not found');
      }
      if (description) {
        const descriptionVal = description.value;
        console.log(descriptionVal); 
      } else {
        console.error(' not found');
      }
    });
  
  



