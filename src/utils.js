const API_KEY = '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi'; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  return [];
}

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  return true;
}

// create post API request to jsonbin server
async function create (arrayContainerItems) {
  document.querySelector('.loader').classList.add('run');
  myTodo = {'my-todo': arrayContainerItems};
  console.log("myTodo", myTodo);
  try {
      const data = await fetch('http://localhost:3000/b/localtodos', {
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
      document.querySelector('.loader').classList.remove('run')
  } catch (e) {
      document.querySelector('.loader').classList.remove('run')
      console.error("there was an error:" + e);
  }

}

//get 
async function read () {
  document.querySelector('.loader').classList.add('run');
  try {
      await fetch('http://localhost:3000/b/localtodos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2b$10$ZFiUgXxIT37j9HZKTvXJkOfMRxB0OzLbyOCbiPFSr4AOca6buiMYi'
          }
        })
        .then(res => res.json())
        .then(data => {
          document.querySelector('.loader').classList.remove('run')
            console.log("data", data);   //on json-bin bin should be data.record
            insertSaveDataToDocument(data);       //on json-bin bin should be data.record
        })
        .catch(error => console.log("error", error));
        document.querySelector('.loader').classList.remove('run')
  } catch (error) {
      document.querySelector('.loader').classList.remove('run')
      console.log(error.message);
  }
}