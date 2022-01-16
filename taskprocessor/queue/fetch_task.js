const amqp = require("amqplib/callback_api");
const task = require("../task/task")

const receiveMessage = () => {
  return new Promise((resolve, reject) => {
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
       reject(error0);
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
            reject(error0);
        }
        var queue = process.env.QUEUE_NAME;

        channel.assertQueue(queue, {
          durable: true
        });
        channel.prefetch(1);
        console.log(
          "Waiting for message in"+
          queue
        );
        channel.consume(
          queue,
          function (msg) {
            console.log(`Message received in worker ${process.pid} with message `+msg.content.toString());
            resolve(msg);
            task.performTask(msg.content.toString());
          },{
            noAck:true
          }
        );
      });
    });
  });
};

exports.startReceiving = async ()=>{
    const response = await receiveMessage();
}
