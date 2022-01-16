var amqp = require("amqplib/callback_api");

const sendMessage = (message) => {
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
          durable: true,
        });
        channel.sendToQueue(queue, Buffer.from(message), {
          persistent: true,
        });
        console.log("Message sent: "+message);
        resolve(message)
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
  });
};

exports.sendRMQMessage = async (message)=>{
    await sendMessage(message);
}

