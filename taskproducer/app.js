const express = require("express")
const mongoose = require("mongoose")
var env = require('dotenv').config()

const createTaskController = require("./controller/create_job")
const taskStatusController = require("./controller/task_status")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/createtask", createTaskController.createJob)
app.get("/taskstatus/:taskid", taskStatusController.getTaskStatus)

app.listen(process.env.PORT | 3000,()=>{
    console.log("Server started")
})

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Mongodb connected...")
    })
    .catch(err => {
        console.log(err);
    });