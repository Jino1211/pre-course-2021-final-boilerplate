const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
let clicksParagraph = document.querySelector('#counter-paragraph span');
let todoContainer;
let clicks = 0;
let detailsInput = {};
console.log(clicksParagraph);
// const ulHolderItems = document.createElement('ul');
// ulHolderItems.classList.add('items-list');
// viewSection.append(ulHolderItems);

const addForm = document.forms['add-form']; 

//when click on button that function grab the inputs and the time and send it to the right function.
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    addTodoContainer();
    addInput(valueInput);
    addDate(timeCreated);
    addPriority(valuePriority);
})

//build the container div for the inputs
function addTodoContainer() {
    todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    viewSection.prepend(todoContainer);
}
//get the value and add it to the list
function addInput (valueInput) {
    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoContainer.append(todoText);
    todoText.innerText = valueInput;
}
//get the date and add it to the list
function addDate (timeCreated) {
    const todoTime= document.createElement('div');
    todoTime.classList.add('todo-created-at');
    todoContainer.append(todoTime);
    todoTime.innerText = timeCreated;
}
//get the priority  and add it to the list
function addPriority (valuePriority) {
    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority');
    todoContainer.append(todoPriority);
    todoPriority.innerText = valuePriority;
}

addForm.addEventListener('submit', (e) => {
    clicks++;
    if(clicks > 1) {
        clicksParagraph.innerText = `${clicks} tasks`;  
    } else { 
        clicksParagraph.innerText = `${clicks} task`;
    }
})

addForm.addEventListener('submit', () => {
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    makeObject(valueInput, timeCreated, valuePriority, clicks)
    addForm.querySelector('input[type="text"]').value = "";
});

let mainArrayContainer = [];
function makeObject(valueInput, timeCreated, valuePriority, clicks) {
    detailsInput.text = valueInput;
    detailsInput.date = timeCreated;
    detailsInput.priority = valuePriority;
    arr.push(detailsInput)
    let json = JSON.stringify(arr);
}





