
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
 * prints all the to do list
 * 
 * @return {void}
 */
function listAll(){
  tasks.map((task, i) => {
    console.log(i +1 + "-" + task)
  })
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
