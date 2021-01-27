const viewSection = document.querySelector('#view-section');

// const ulHolderItems = document.createElement('ul');
// ulHolderItems.classList.add('items-list');
// viewSection.append(ulHolderItems);

const addForm = document.forms['add-form']; 

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    addItems(valueInput,valuePriority);
})

function addItems(valueInput,valuePriority) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    viewSection.append(todoContainer);
    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority');
    todoContainer.append(todoPriority);
    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoContainer.append(todoText);
    todoText.innerText = valueInput;
    todoPriority.innerText = valuePriority;
}



