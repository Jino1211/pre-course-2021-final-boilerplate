const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
const sortButton = document.querySelector('#sort-button');
let clicksParagraph = document.querySelector('#counter-paragraph span');
let arrayContainerItems = [];
let todoContainer;
let taskNumber = 0;
let counterId = 1;
read();

const addForm = document.forms['add-form']; 

//when click on button that function grab the inputs and the time and send it to the right function.
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    makeObject(valueInput, timeCreated, valuePriority, taskNumber);
    addTodoContainer();
    deleteButton();
    checkBoxButton();
    addPriority(valuePriority);
    addInput(valueInput);
    addDate(timeCreated);
    addForm.querySelector('input[type="text"]').value = "";
    addForm.querySelector('select').value = '1';
})

//build the container div for the inputs
function addTodoContainer() {
    todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    todoContainer.setAttribute('id', `task${counterId}`)
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
    deleteButton.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        taskNumber--;
        howManyTask(taskNumber);
        arrayContainerItems.pop();
        create(arrayContainerItems);
     })
}



addForm.addEventListener('submit', () => {
    taskNumber++
    howManyTask(taskNumber);
}) 

//count the taskNumber and print it on the document
function howManyTask (taskNumber) {
    if(taskNumber > 1) {
        clicksParagraph.innerText = `${taskNumber} tasks`;  
    } else { 
        clicksParagraph.innerText = `${taskNumber} task`;
    }
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

//creat an object from task details and push it to the main array
function makeObject(valueInput, timeCreated, valuePriority, taskNumber) {
    const detailsInput = {};
    detailsInput.text = valueInput;
    detailsInput.date = timeCreated;
    detailsInput.priority = valuePriority;
    detailsInput.id = counterId;
    arrayContainerItems.push(detailsInput);
    counterId++;

    create(arrayContainerItems);
    console.log(arrayContainerItems);
}

function checkBoxButton () {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('check-box');
    todoContainer.append(checkBox);
}


// create post API request to jsonbin server
async function create (arrayContainerItems) {
    console.log("arrayContainerItems", arrayContainerItems);
    await fetch('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi',
          'X-Collection-Id': '6013058bef99c57c734b2b3f',
          'X-Bin-Private': false,
        //   'X-Bin-Name': Array.id
        },
        body : JSON.stringify(arrayContainerItems)
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
}

//get 
async function read () {
    try {
        await fetch('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c/latest', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi'
            }
          })
          .then(res => res.json())
          .then(data => {
              console.log("data", data);
              insertSaveDataToDocument(data.record);
          })
          .catch(err => console.log("error", err));
    } catch (error) {
        console.log(error.message);
    }
}

//upload the save task from the server 
function insertSaveDataToDocument (arr) {
    console.log("arr", arr)
    if (arr) {
        // secure the jsonbin server from error message
        for (let task of arr) {
            addTodoContainer();
            addPriority(task.priority);
            addInput(task.text);
            addDate(task.date);
            deleteButton();
            checkBoxButton();
            howManyTask(++taskNumber);
        }
        counterId = arr[arr.length-1].id+1; // make sure
        arrayContainerItems = arr;
    }
}
// addTodoContainer();
// addPriority(valuePriority);
// addInput(valueInput);
// addDate(timeCreated);
// makeObject(valueInput, timeCreated, valuePriority, taskNumber)