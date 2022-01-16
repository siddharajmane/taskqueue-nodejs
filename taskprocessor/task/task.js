const taskUpdater = require("../model/updateTask")

function fibonacci(n) {
    if (n < 2) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
exports.performTask = (message)=>{
    const jsonMessage = JSON.parse(message);
        console.log("performing task")
        taskUpdater.updateTask(jsonMessage.id,"INPROGRESS",0);
        const fibresult = fibonacci(jsonMessage.query);
        taskUpdater.updateTask(jsonMessage.id,"COMPLETED",fibresult);
}
