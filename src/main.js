const restoreButton = document.querySelector('#restore'); 
const viewSection = document.querySelector('#view-section');
const controlSection = document.querySelector('#control-section');
const sortButton = document.querySelector('#sort-button');
const searchButton = document.querySelector('#search-button');
const undoButton = document.querySelector('#undo');
const sortOfDateButton = document.querySelector('#date-sort');
let clicksSpan = document.querySelector('#counter');
let arrayContainerItems = [];
let mayTodo = {};
let todoContainer;
let taskNumber = 0;
let counterId = 1;
let history = [];
let yesButton;
let noButton;
let spanYesNo;
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

    // create sure yes/no button before delete.
    img.addEventListener('click', (e) => {
        spanYesNo = document.createElement('span')
        viewSection.append(spanYesNo);
        spanYesNo.innerText = 'Are You Sure?'
        spanYesNo.setAttribute('id', 'span-yes-no')
        yesButton = document.createElement('img');
        yesButton.setAttribute('src', './images/yes-button.jpg.png');
        yesButton.setAttribute('id', 'yes-button');
        noButton = document.createElement('img');
        noButton.setAttribute('src', './images/no-button.jpg.png');
        noButton.setAttribute('id', 'no-button');
        viewSection.append(yesButton);
        viewSection.append(noButton);
        const parentElem = e.target.parentElement;
        yesDelete(parentElem);
        noDelete();
    })
}

// if user click on yes, function delete the task and remove the buttons. 
function yesDelete(parentElem) {
    yesButton.addEventListener('click', () => {
        const ownId = parentElem.getAttribute('id'); 
        let i = 0;
        for (let task of arrayContainerItems) {
            if (task.id === Number(ownId)) { 
                history.push(task);
                break;
            } 
            i++;
        }
        parentElem.parentElement.removeChild(parentElem);
        taskNumber--;
        howManyTask(taskNumber);
        arrayContainerItems.splice(i, 1);
        spanYesNo.remove();
        noButton.remove();
        yesButton.remove();
        if(!arrayContainerItems) {
            create ('I Am Empty')     // this is make sure the server get something but still the task list stay empty without this 
        }                              // the server don't let the option PUT with empty array/object
        create(arrayContainerItems);
    })
}

//if user click no remove the button- yes/no without delete the task. 
function noDelete() {
    noButton.addEventListener('click', () => {
        spanYesNo.remove();
        noButton.remove();
        yesButton.remove();
    })
}
    
//cancel the last delete action.
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
        taskNumber++;
        howManyTask(taskNumber);
})

// this function create a edit button + active his options to edit the text.
function editButton () {
    const img = document.createElement('img');
    img.setAttribute('src', './images/edit.jpg.png');
    img.classList.add('edit-img');
    todoContainer.append(img);
    img.addEventListener('click', (e) => {
        const textContent = e.target.parentElement.children[1]
            textContent.contentEditable = true;
            textContent.style.backgroundColor = '#ffcccc' 
            img.setAttribute('src', './images/done.jpg.png');
            img.classList.add('finishEdit');
            doneButton(img, textContent);  
        // }
    })
}

//this is active when the user click on edit button, it change the button to done button, end define his options. 
function doneButton (img, textContent) {
    img.addEventListener('click', (e) => {
            for (let task of arrayContainerItems) {
                if (task.id === Number(textContent.parentElement.getAttribute('id'))) { 
                    task.text = textContent.innerText;
                    create(arrayContainerItems);
                    break;
                }
            }
            textContent.contentEditable = false;
            textContent.style.backgroundColor = '';
            img.classList.remove('finishEdit');
            img.setAttribute('src', './images/edit.jpg.png');
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
                replaceItemsBySort(item, j++);
            }
        }    
    }   
})

// find if the search value include in the task and remark them.
searchButton.addEventListener('click', (e) => {
    const searchValue = document.querySelector('#text-search').value;
    if (searchValue){
        for (task of arrayContainerItems) {
            if (task.text.toLowerCase().includes(searchValue.toLowerCase())) {
            const id = task.id;
            document.getElementById(id).classList.toggle('find');
                switch (searchButton.innerText) {
                    case 'Search':
                        searchButton.innerText = 'click again to cancel';
                        break;
                    case 'click again to cancel':
                        searchButton.innerText = 'Search';
                }
            }
        }
    }
})

//sort the list from newest to oldest and opposite.
sortOfDateButton.addEventListener('click', (e) => {
    arrayContainerItems.reverse();
    switch (sortOfDateButton.innerText) {
        case 'Newest':
            sortOfDateButton.innerText = 'Oldest';
            break;
        case 'Oldest':
            sortOfDateButton.innerText = 'Newest';
    } 
    let j = 0;
    for (task of arrayContainerItems) {
        replaceItemsBySort(task, j++);
    }
})

//get item (object) and replace the document by priority
function replaceItemsBySort (item, j) {
    let containerText = document.querySelectorAll('.todo-text');
    containerText[j].innerText = item.text;
    let containerDate = document.querySelectorAll('.todo-created-at');
    containerDate[j].innerText = item.date;
    let containerPriority = document.querySelectorAll('.todo-priority');
    containerPriority[j].innerText = item.priority;
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

//mark the text with trough line for task that done.
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

//clear the board from all tasks
restoreButton.addEventListener('click', () => {
    let taskOnBoard = document.querySelectorAll('.todo-container');
    for (let task of taskOnBoard) {
        task.parentElement.removeChild(task);
        taskNumber--;
        howManyTask(taskNumber);
        arrayContainerItems.pop();
    }
    create (arrayContainerItems);
})


// create post API request to jsonbin server
// async function create (arrayContainerItems) {
//     document.querySelector('.loader').classList.add('run');
//     myTodo = {'my-todo': arrayContainerItems};
//     console.log("myTodo", myTodo);
//     try {
//         const data = await fetch('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c', {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi',
//               'X-Collection-Id': '6013058bef99c57c734b2b3f',
//               'X-Bin-Private': false,
//             },
//             body : JSON.stringify(myTodo)
//           })
//           document.querySelector('.loader').classList.remove('run');
//         console.log("Recieved data", data)
//     } catch (e) {
//         console.error("there was an error:" + e);
//     }

// }

function create (arrayContainerItems) {
    document.querySelector('.loader').classList.add('run');
    myTodo = {'my-todo': arrayContainerItems};
    console.log("myTodo", myTodo);
    const dataPromise = fetch('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi',
          'X-Collection-Id': '6013058bef99c57c734b2b3f',
          'X-Bin-Private': false,
        },
        body : JSON.stringify(myTodo)
        })
        dataPromise.then(res => {
            if (!res.ok) {
            document.querySelector('.loader').classList.remove('run');
            throw(new Error('Cant put the data in server'));
        }
            console.log("Received data:", res)
            // console.log("data Promise:", dataPromise)
            document.querySelector('.loader').classList.remove('run')
        }).catch ((e)=> console.log(e));
         

}


function read () {
    document.querySelector('.loader').classList.add('run');
    const fetchPromise = fetch ('https://api.jsonbin.io/v3/b/60130624ef99c57c734b2b7c/latest')
    console.log(fetchPromise);
    const res = fetchPromise.then(res => {
        document.querySelector('.loader').classList.remove('run');
        return res.json();
    })
    res.then(data => {
            console.log(fetchPromise);
            console.log(res);
            console.log("data", data);
            insertSaveDataToDocument(data.record);
    }).catch(error => console.log("error", error));
    }


//upload the save task from the server 
function insertSaveDataToDocument (data) {
    arrayContainerItems = data['my-todo'];
    // console.log("data", arrayContainerItems)
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

