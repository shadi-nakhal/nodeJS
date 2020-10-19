
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
  console.log(`Welcome to ${name}'s application!`);
  console.log("type 'help' to see all commands");
  console.log("--------------------")
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
  console.log("1.[hello] to print hello! or [hello] followed by your name to print hello + your name");
  console.log("2.[exit or quit] to exit the program");
  console.log("3.[help] to show all commands and their description")
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
    console.log(i +1 + "-" + task)
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
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Shadi Nakhal")
