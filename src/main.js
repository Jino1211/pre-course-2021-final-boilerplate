const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
const sortButton = document.querySelector('#sort-button');
let clicksParagraph = document.querySelector('#counter-paragraph span');
let todoContainer;
let clicks = 0;

read();

const addForm = document.forms['add-form']; 

//when click on button that function grab the inputs and the time and send it to the right function.
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    addTodoContainer();
    deleteButton();
    addPriority(valuePriority);
    addInput(valueInput);
    addDate(timeCreated);
    addForm.querySelector('input[type="text"]').value = "";
    addForm.querySelector('select').value = '1';
    makeObject(valueInput, timeCreated, valuePriority, clicks)
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

function deleteButton () {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    todoContainer.append(deleteButton);
    deleteButton.innerText = 'Delete';
}
// todoContainer.addEventListener('click' (e) => {
//     e.target
//     console.log('hi');
//  })

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


function makeObject(valueInput, timeCreated, valuePriority, clicks) {
    const detailsInput = {};
    detailsInput.text = valueInput;
    detailsInput.date = timeCreated;
    detailsInput.priority = valuePriority;
    arrayContainerItems.push(detailsInput)
    const json = JSON.stringify(arrayContainerItems);
    create(JSON.stringify(detailsInput));
    console.log(arrayContainerItems);
}

//create post api request to jsonbin server
async function create (json) {
    const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi',
          'X-Collection-Id': '60127ad79f55707f6dfd20a9',
          'X-Bin-Private': false,
          'X-Bin-Name': 'mose'
        },
        body : json
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
}

//get 
async function read () {
    try {
        await fetch('https://api.jsonbin.io/v3/c/60127ad79f55707f6dfd20a9/bins/2', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi'
            }
          })
          .then(res => res.json())
          .then(data => {
              console.log("data", data)
              insertSaveDataToDocument(data)
          })
          .catch(err => console.log("error", err));
    } catch (error) {
        console.log(error.message);
    }
}

//upload the save task from the server 
function insertSaveDataToDocument (data) {
    if (data) {
        // secure the jsonbin server from error message
        if (!data.hasOwnProperty('message')) {
            for (let task of data) {
                addTodoContainer();
                addPriority(task.priority);
                addInput(task.text);
                addDate(task.date);
                arrayContainerItems.push(task)


            }
        }
    }
}
// addTodoContainer();
// addPriority(valuePriority);
// addInput(valueInput);
// addDate(timeCreated);
// makeObject(valueInput, timeCreated, valuePriority, clicks)