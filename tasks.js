
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`\x1b[40m\x1b[36m\x1b[5mWelcome\x1b[0m\x1b[40m\x1b[36m to ${name}'s application!`);
  console.log("type 'help' to see all commands");
  console.log("--------------------","\x1b[0m")
}

/*
stores all the tasks
*/
var tasks = ["finish this exercise", "eat food"]


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.split(" ")[0] === 'hello' || text === 'hello\n'){
    hello(text);
  }
  else if (text === 'help\n'){
    helpCommand();
  }
  else if (text === 'list\n'){
    listAll();
  }
  else if (text.split(" ")[0] === 'add' || text === 'add\n'){
    addTask(text);
  }
  else if (text.split(" ")[0] === 'remove' || text === 'remove\n'){
    removeTask(text);
  }
  else{
    unknownCommand(text)
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  if(text === "hello\n"){
    console.log("hello!")
  }else{
  console.log(text.replace('\n', '!'))
  }
}

/**
 * prints all the commands
 * 
 * @return {void}
 */
function helpCommand(){
  console.log("\x1b[34m");
  console.log("1.[hello] to print hello! or [hello] followed by your name to print hello + your name");
  console.log("2.[list] to list all the tasks");
  console.log("3.[add] to add a task");
  console.log("4.[remove] followed by the number of the task to delete it");
  console.log("5.[exit or quit] to exit the program");
  console.log("6.[help] to show all commands and their description")
  console.log("\x1b[0m");
}

/**
 * prints all the tasks
 * 
 * @return {void}
 */
function listAll(){
  if(tasks.length == 0){
    console.log("\x1b[31m", "list is empty","\x1b[0m")
  }else {
  tasks.map((task, i) => {
    let random = Math.floor(Math.random() * 7) + 1
    console.log(`\x1b[3${random}m`, i +1 + "-" + task, "\x1b[0m")
  })
}
}

/**
 * adds to the tasks list
 * 
 * @return {void}
 */
function addTask(todo){
  if(todo.trim() === "add"){
    console.log("\x1b[31m", "error missing parameter!","\x1b[0m" )
  }else{
    tasks.push(todo.split(" ")[1].trim());
    console.log("\x1b[32m" + todo.split(" ")[1].trim() + " is added to the tasks \x1b[0m")
  }
}
/**
 * adds to the tasks list
 * 
 * @return {void}
 */
function removeTask(todo){
  if(todo.trim() === "remove"){
    console.log("\x1b[31m", "error missing parameter!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1].trim())-1] == undefined){
    console.log("\x1b[31m", "task is not defined!","\x1b[0m" )
  }else{
    console.log("\x1b[32m" + "["+tasks[Number(todo.split(" ")[1].trim())-1]+"]" + " is removed from tasks \x1b[0m");
    tasks.splice(Number(todo.split(" ")[1].trim())-1,1);
    
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!', "\x1b[0m")
  process.exit();
}

// The following line starts the application
startApp("Shadi Nakhal")
