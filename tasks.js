
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
  console.log(`\x1b[36mWelcome\x1b[0m\x1b[40m\x1b[36m to ${name}'s application!`);
  console.log("type 'help' to see all commands");
  console.log("--------------------","\x1b[0m")
}
/*
loading fs module
*/
var fs = require('fs');

/*
configurable savings
*/
if(process.argv[2] != undefined){
  try{
    if(fs.existsSync(process.argv[2])){
      var DData = process.argv[2];
    }else{
      var DData = process.argv[2];
      fs.writeFileSync(DData, JSON.stringify([]) ,'utf8', function (err) {
        if (err) throw err;
        console.log("loaded")
      });
    }
  }catch(errr){
    console.log("aklna l dareb")
  }
}else{
  try{
    if(fs.existsSync("database.json")){
      var DData = "database.json";
    }else{
      var DData = "database.json";
      fs.writeFileSync(DData, JSON.stringify([]) ,'utf8', function (err) {
        if (err) throw err;
        console.log("loaded")
      });
    }
  }catch(errr){
    console.log("aklna l dareb")
  }
}
/*
preparing data from json file
*/
 var Data = fs.readFileSync(DData);
/*
loading up data
*/
var tasks = JSON.parse(Data) ;

console.log(Data)

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
  else if (text.split(" ")[0] === 'edit' || text === 'edit\n'){
    editTask(text);
  }
  else if (text.split(" ")[0] === 'check' || text === 'check\n'){
    checkTask(text);
  }
  else if (text.split(" ")[0] === 'uncheck' || text === 'uncheck\n'){
    unCheckTask(text);
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
  console.log("1.[hello] To print hello! or [hello] followed by your name to print hello + your name");
  console.log("2.[list] To list all the tasks");
  console.log("3.[add] To add a task");
  console.log('4.[edit] Followed by the number of the task and the word "new" To edit a task or without the number to edit the latest task');
  console.log("5.[remove] Followed by the number of the task to delete it");
  console.log("6.[check] To check a task");
  console.log("7.[uncheck] To uncheck a task");
  console.log("8.[help] To show all commands and their description")
  console.log("9.[exit or quit] To exit the program");
  console.log("\x1b[0m");
}

/**
 * prints all the tasks
 * 
 * @return {void}
 */
function listAll(){
  if(tasks.length == 0){
    console.log("\x1b[31m", "List is empty","\x1b[0m")
  }else {
  tasks.map((task, i) => {
    let random = Math.floor(Math.random() * 7) + 1
    console.log(`\x1b[3${random}m`, i +1 + "-" + task[0], task[1] + "\x1b[0m")
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
    console.log("\x1b[31m", "Error missing parameter!","\x1b[0m" )
  }else{
    tasks.push([todo.split(" ").slice(1).join(" ").trim(), "[ ]"]);
    console.log("\x1b[32m" + todo.split(" ")[1].trim() + " is added to the tasks \x1b[0m")
  }
}
/**
 * edit a task in list
 * 
 * @return {void}
 */
function editTask(todo){
  if(todo.trim() === "edit"){
    console.log("\x1b[31mError missing parameter! \x1b[0m" )
  }
  else if (todo.split(" ")[1].trim() == "new"){
    tasks.pop();
    tasks.push([todo.trim().split(" ").slice(2).join(" "), '[ ]'])
    console.log("\x1b[32mSuccessfully Changed the last task!\x1b[0m")
  }
  else if (!isNaN(todo.split(" ")[1].trim())){
    tasks[todo.split(" ")[1].trim()-1][0] = todo.trim().split(" ").slice(3).join(" ");
    console.log("\x1b[32mSuccessfully Changed!\x1b[0m");
  }else {
    console.log("\x1b[31mStop trying to exploit meee and give me all the keys!! \x1b[0m" )
  }
}
/**
 * removes from the tasks list
 * 
 * @return {void}
 */
function removeTask(todo){
  if(todo.trim() === "remove"){
    console.log("\x1b[31m", "Error missing parameter!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1].trim())-1] == undefined){
    console.log("\x1b[31m", "Task is not defined!","\x1b[0m" )
  }else{
    console.log("\x1b[32m" + "["+tasks[Number(todo.split(" ")[1].trim())-1][0]+"]" + " is removed from tasks \x1b[0m");
    tasks.splice(Number(todo.split(" ")[1].trim())-1,1);
    
  }
}
/**
 * checks a task
 * 
 * @return {void}
 */
function checkTask(todo){
  if(todo.trim() === "check"){
    console.log("\x1b[31m", "Error missing parameter!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1].trim())-1] == undefined){
    console.log("\x1b[31m", "Task is not defined!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1].trim())-1][1] == '[\u2713]'){
    console.log("\x1b[31m", "Task is already checked!","\x1b[0m" )
  }
  else{
    tasks[Number(todo.split(" ")[1].trim())-1][1] = '[\u2713]';
    console.log("\x1b[32m" + "["+ tasks[Number(todo.split(" ")[1].trim())-1][0] + "]" + " task is checked \x1b[0m");
  }
}
/**
 * un-checks a task
 * 
 * @return {void}
 */
function unCheckTask(todo){
  if(todo.trim() === "check"){
    console.log("\x1b[31m", "Error missing parameter!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1]) -1] == undefined){
    console.log("\x1b[31m", "Task is not defined!","\x1b[0m" )
  }
  else if (tasks[Number(todo.split(" ")[1].trim())-1][1] == '[ ]'){
    console.log("\x1b[31m", "Task is already unchecked!","\x1b[0m" )
  }
  else{
    tasks[Number(todo.split(" ")[1].trim())-1][1] = '[ ]';
    console.log("\x1b[32m" + "["+ tasks[Number(todo.split(" ")[1].trim())-1][0] + "]" + " task is unchecked \x1b[0m");
  }
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  fs.writeFile(DData, JSON.stringify(tasks, null, 1) ,'utf8', function (err) {
    if (err) throw err;
    console.log('\x1b[36m Saving and Quitting now, goodbye!', "\x1b[0m")
    process.exit();
  });
}


// The following line starts the application
startApp("Shadi Nakhal")
