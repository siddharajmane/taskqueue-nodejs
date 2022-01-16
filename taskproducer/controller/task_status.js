const taskModel = require("../model/TaskModel");

exports.getTaskStatus = (req,res)=>{
    const taskid = req.params.taskid;
    taskModel.findOne({id:taskid})
        .then(doc=>{
            if(doc){
                if(doc.status === "COMPLETED"){
                    return res.send(doc);
                }else{
                    return res.send({taskstatus: doc.status});
                }
            }else{
                return res.send({message: "Requested taskid not found"});
            }
        })
        .catch(err=>{
            return res.status(500).send({message: "Internal server error"})
        })
}