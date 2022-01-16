const taskModel = require("./TaskModel")

exports.updateTask = async (id, status, result)=>{
    try{
        const updateresult = await taskModel.updateOne({id:id},{status:status, result:result})
        console.log("status updated of task id: "+id+" and with status: "+status);
    }catch(err){
        console.log("Error updating status of task :"+err)
    }
    
}