const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
let clicksParagraph = document.querySelector('#counter-paragraph span');
let todoContainer;
let clicks = 0;
const sortButton = document.querySelector('#sort-button');



const addForm = document.forms['add-form']; 

//when click on button that function grab the inputs and the time and send it to the right function.
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    addTodoContainer();
    addPriority(valuePriority);
    addInput(valueInput);
    addDate(timeCreated);
    makeObject(valueInput, timeCreated, valuePriority, clicks)
    addForm.querySelector('input[type="text"]').value = "";
    addForm.querySelector('select').value = '1';
})

//build the container div for the inputs
function addTodoContainer() {
    todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    viewSection.prepend(todoContainer);
}
//get the priority  and add it to the list
function addPriority (valuePriority) {
    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority');
    todoContainer.append(todoPriority);
    todoPriority.innerText = valuePriority;
}
//get the date and add it to the list
function addDate (timeCreated) {
    const todoTime= document.createElement('div');
    todoTime.classList.add('todo-created-at');
    todoContainer.append(todoTime);
    todoTime.innerText = timeCreated;
}
//get the value and add it to the list
function addInput (valueInput) {
    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoContainer.append(todoText);
    todoText.innerText = valueInput;
}

//count the clicks and print it on the document
addForm.addEventListener('submit', (e) => {
    clicks++;
    if(clicks > 1) {
        clicksParagraph.innerText = `${clicks} tasks`;  
    } else { 
        clicksParagraph.innerText = `${clicks} task`;
    }
})

let arrayContainerItems = [];
function makeObject(valueInput, timeCreated, valuePriority, clicks) {
    const detailsInput = {};
    detailsInput.text = valueInput;
    detailsInput.date = timeCreated;
    detailsInput.priority = valuePriority;
    arrayContainerItems.push(detailsInput)
    let json = JSON.stringify(arrayContainerItems);
    console.log(arrayContainerItems);
}

//sort of function that check by priority from 5-1 and send it to => "replaceItemsByPriority" 
sortButton.addEventListener('click', () => {
    let j = 0;
  for (let i = 5; i > 0; i--) {  
    for (let item of arrayContainerItems) {
            if (item.priority === `${i}`) {
                replaceItemsByPriority(item, j++);
                console.log(item.priority);
            }
        }    
    }   
})

//get item (object) and replace the document by priority
function replaceItemsByPriority (item, j) {
    let containerText = document.querySelectorAll('.todo-text');
    containerText[j].innerText = item.text;
    let containerDate = document.querySelectorAll('.todo-created-at');
    containerDate[j].innerText = item.date;
    let containerPriority = document.querySelectorAll('.todo-priority');
    containerPriority[j].innerText = item.priority;
    console.log(containerText, containerDate, containerPriority);
}




