const mongoose = require("mongoose")
var env = require('dotenv').config()
const cluster = require("cluster")
const CPU_CORE = 4;

const rmq = require("../queue/fetch_task");

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Mongodb connected...")
    })
    .catch(err => {
        console.log(err);
    });
if(cluster.isMaster){
    console.log(`Master is up PID: ${process.pid}`)
    for(var i=0;i<CPU_CORE;i++){
        cluster.fork();
    }
}else{
    console.log(`Worker is up PID: ${process.pid}`)
    rmq.startReceiving();
}