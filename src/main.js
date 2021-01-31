const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
const sortButton = document.querySelector('#sort-button');
const searchButton = document.querySelector('#search-button');
const undoButton = document.querySelector('#undo');
let clicksSpan = document.querySelector('#counter');
let arrayContainerItems = [];
let mayTodo = {};
let todoContainer;
let taskNumber = 0;
let counterId = 1;
let history = [];
read();

const addForm = document.forms['add-form']; 

//when click on button that function grab the inputs and the time and send it to the right function.
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    counterId++;
    const valueInput = addForm.querySelector('input[type="text"]').value;
    const valuePriority = addForm.querySelector('select').value;
    let timeCreated = new Date();
    timeCreated = timeCreated.toLocaleString();
    makeObject(valueInput, timeCreated, valuePriority);
    addTodoContainer();
    addPriority(valuePriority);
    addInput(valueInput);
    addDate(timeCreated);
    deleteButton();
    editButton();
    checkBoxButton();
    addForm.querySelector('input[type="text"]').value = "";
    addForm.querySelector('select').value = '1';
})

//build the container div for the inputs
function addTodoContainer() {
    todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container')
    todoContainer.setAttribute('id', counterId)
    viewSection.append(todoContainer);
}
//get the priority and add it to the list
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
//set the delete button on the task
function deleteButton () {
    const img = document.createElement('img');
    img.setAttribute('src', './images/garbage.jpg');
    img.classList.add('garbage-img');
    todoContainer.append(img);

// delete the task and update the main array + server
    img.addEventListener('click', (e) => {
        const ownId = e.target.parentElement.getAttribute('id');
        let i = 0;
        for (let task of arrayContainerItems) {
            if (task.id === Number(ownId)) { 
                history.push(task);
                break;
            } 
            i++;
        }
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
        taskNumber--;
        howManyTask(taskNumber);
        arrayContainerItems.splice(i, 1);
        console.log(arrayContainerItems);
        if(!arrayContainerItems) {
            create ('I Am Empty')     // this is make sure the server get something but still the task list stay empty without this 
        }                              // the server don't let the option PUT with empty array/object
        create(arrayContainerItems);
     })
}

undoButton.addEventListener('click', (e) => {
    let lastTask = history.pop();
        counterId++;
        console.log(lastTask);
        makeObject(lastTask.text, lastTask.date, lastTask.priority, taskNumber);
        addTodoContainer();
        addPriority(lastTask.priority);
        addInput(lastTask.text);
        addDate(lastTask.date);
        deleteButton();
        editButton();
        checkBoxButton();
})

// this function create a edit button + active his options to edit the text.
function editButton () {
    const img = document.createElement('img');
    img.setAttribute('src', './images/edit.jpg');
    img.classList.add('edit-img');
    todoContainer.append(img);
    img.addEventListener('click', (e) => {
        const textContent = e.target.parentElement.children[1]
            textContent.contentEditable = true;
            textContent.style.backgroundColor = '#ffcccc' 
            img.setAttribute('src', './images/done.jpg');
            img.classList.add('finishEdit');
            doneButton(img, textContent);  
        // }
    })
}

//this is active when the user click on edit button, it is change the button to done button, end define his options. 
function doneButton (img, textContent) {
    img.addEventListener('click', (e) => {
            let i = 0;
            for (let task of arrayContainerItems) {
                if (task.id === Number(textContent.parentElement.getAttribute('id'))) { 
                    task.text = textContent.innerText;
                    create(arrayContainerItems);
                    break;
                } 
                i++;
            }
            textContent.contentEditable = false;
            textContent.style.backgroundColor = 'white';
            img.classList.remove('finishEdit');
            img.setAttribute('src', './images/edit.jpg');
        // }
    })
}

//update the number of task.
addForm.addEventListener('submit', () => {
    taskNumber++;
    howManyTask(taskNumber);
}) 

//count the taskNumber and print it on the document
function howManyTask (taskNumber) {
    let spanTask = document.querySelector('#span-task')
    if(taskNumber > 1) {
        spanTask.innerText = ' tasks';
        clicksSpan.innerText = `${taskNumber}`; 

    } else { 
        clicksSpan.innerText = `${taskNumber}`;
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

searchButton.addEventListener('click', (e) => {
    const searchValue = document.querySelector('#text-search').value;
    for (task of arrayContainerItems) {
        if (task.text.toLowerCase() === searchValue.toLowerCase()) {
        const id = task.id;
        document.getElementById(id).classList.toggle('find');
            switch (searchButton.innerText) {
                case 'search':
                    searchButton.innerText = 'click again to cancel';
                    break;
                case 'click again to cancel':
                    searchButton.innerText = 'search';
            }
        }
    }
})
console.log();



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
function makeObject(valueInput, timeCreated, valuePriority) {
    const detailsInput = {};
    detailsInput.text = valueInput;
    detailsInput.date = timeCreated;
    detailsInput.priority = valuePriority;
    detailsInput.id = counterId;
    arrayContainerItems.push(detailsInput);
    create(arrayContainerItems);
    
}

function checkBoxButton () {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.classList.add('check-box');
    todoContainer.append(checkBox);
    checkBox.addEventListener('change', (e) => {
        if (e.target.checked) {
            e.target.parentElement.classList.toggle('done');
        } else {
            e.target.parentElement.classList.toggle('done')
        }
    })
}


// create post API request to jsonbin server
async function create (arrayContainerItems) {
    myTodo = {'my-todo': arrayContainerItems};
    console.log("myTodo", myTodo);
    try {
        const data = await fetch('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi',
              'X-Collection-Id': '6013058bef99c57c734b2b3f',
              'X-Bin-Private': false,
            //   'X-Bin-Name': Array.id
            },
            body : JSON.stringify(myTodo)
          })
        console.log("Recieved data", data)
    } catch (e) {
        console.error("there was an error:" + e);
    }

}

//get 
async function read () {
    document.querySelector('.loader').classList.add('run');
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
              console.log("data", data.record);
              insertSaveDataToDocument(data.record);
          })
          .catch(error => console.log("error", error));
    } catch (error) {
        console.log(error.message);
    }
}

//upload the save task from the server 
function insertSaveDataToDocument (data) {
    arrayContainerItems = data['my-todo'];
    document.querySelector('.loader').classList.remove('run')
    console.log("data", arrayContainerItems)
    if (arrayContainerItems) {
        // secure the jsonbin server from error message
        // counterId = arrayContainerItems[arrayContainerItems.length-1].id+1; // make sure
        
        for (let task of arrayContainerItems) {
            counterId = task.id;
            addTodoContainer();
            addPriority(task.priority);
            addInput(task.text);
            addDate(task.date);
            deleteButton();
            editButton();
            checkBoxButton();
            howManyTask(++taskNumber);
        }
    console.log(arrayContainerItems); // make sure
    } else {console.log('empty');}
}
// addTodoContainer();
// addPriority(valuePriority);
// addInput(valueInput);
// addDate(timeCreated);
// makeObject(valueInput, timeCreated, valuePriority, taskNumber)