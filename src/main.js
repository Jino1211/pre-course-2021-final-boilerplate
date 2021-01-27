const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
let clicksParagraph = document.querySelector('#counter-paragraph span');
let clicks = 0;
console.log(clicksParagraph);
// const ulHolderItems = document.createElement('ul');
// ulHolderItems.classList.add('items-list');
// viewSection.append(ulHolderItems);

const addForm = document.forms['add-form']; 

//when click on button that function grab the input and the time and send it to => 'addItem' and then clear the input field 
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    addItems(valueInput, valuePriority, timeCreated);
    addForm.querySelector('input[type="text"]').value = "";
})

//get the time when created input values from users and added them to the list.
function addItems(valueInput, valuePriority, timeCreated) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    viewSection.prepend(todoContainer);
    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority');
    todoContainer.append(todoPriority);
    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoContainer.append(todoText);
    const todoTime= document.createElement('div');
    todoTime.classList.add('todo-created-at');
    todoContainer.append(todoTime);
    
    todoText.innerText = valueInput;
    todoPriority.innerText = valuePriority;
    todoTime.innerText = timeCreated;
}

addForm.addEventListener('submit', (e) => {
    clicks++;
    if(clicks > 1) {
        clicksParagraph.innerText = `${clicks} tasks`;  
    } else { 
        clicksParagraph.innerText = `${clicks} task`;
    }
})
// const json = JSON.stringify(viewSection);
// console.log(json);




