const rmq = require("../queue/queue")
const random = require("../util/Random")
const taskModel = require("../model/TaskModel")

exports.createJob = (req,res)=>{
    const query = req.body.number;
    const id = random.get6RandomStrings();
    const TaskModel = new taskModel();
    TaskModel.id = id;
    TaskModel.query = query;
    TaskModel.result = 0;
    TaskModel.status = "WAITING";

    TaskModel.save(err=>{
        if(!err){
            rmq.sendRMQMessage(JSON.stringify({id:id,query:query,result:0}));
            return res.send({message: "Job submitted", taskid:id});
        }else{
            return res.status(500).send({message: "Internal server error"});
        }
    })
}