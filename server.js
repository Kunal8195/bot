/*const express = require('express');
const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');
const botmaster = new Botmaster();


const app = express()

app.get('/', (req, res) => {
	res.send('ok')
})

app.listen(8000, function(err, result){
	if(err){
		console.log('err', err)
	} else {
		console.log('result', app.info)
	}
})

const socketioSettings = {
  id: '00001',
  server: botmaster.server, // this is required for socket.io. You can set it to another node server object if you wish to. But in this example, we will use the one created by botmaster under the hood
};

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);



botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Hello world!');
  }
});

*/

/*const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');
const botmaster = new Botmaster();

const socketioSettings = {
  id: '00001',
  server: botmaster.server, // this is required for socket.io. You can set it to another node server object if you wish to. But in this example, we will use the one created by botmaster under the hood
};

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Hello world!');
  }
});*/

const express = require('express'); //added
const recastai = require('recastai')
const request = require('request');
const port = process.env.PORT || 3000; //added
const app = express(); //added

// Routing for index.html
app.use(express.static(__dirname + '/public')); //added

const server = app.listen(port, '0.0.0.0', () => {  //added
    console.log('Server listening at port %d', port);
});

const Botmaster = require('botmaster');
const SocketioBot = require('botmaster-socket.io');

const botmaster = new Botmaster({
  server,
});

const socketioSettings = {
  id: '00001',
  server,
};

let dataToSend = null;

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {

    console.log(update.raw.message.text,'-=-=-=-')
    let message = update.raw.message.text

const client = new recastai.request('4eb80539442ac9ff618a3cb48fee7853', 'en')
//inputText is the chat that user will send

client.analyseText(message)

  .then(function(res) {

    if (res.intent()) { console.log('Intent: ', res.intent().slug) }

    if (res.intent().slug === 'measure_sales') {

      // send a response back saying you want 

    //to measure sales
    dataToSend = 'want to measure sales'

    }

  if (res.intent().slug === 'measure_sales') {

      // send a response back saying you want 

    //to measure sales and send the entities 

    //returned
    dataToSend = 'want to measure sales and send the entities returned'

    }

  if (res.intent().slug === 'measure_pipline') {

      // send a response back saying you want 

    //to measure pipline and send the entities 

    //returned
    dataToSend = 'want to measure pipeline and send the entities'

    }

  

  })

        /*
        request({
      method: 'POST',
      url:'http://52.15.46.77:5000/parse',
      headers:{
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Postman-Token': '6527ea42-e3f7-4c82-8f03-1b4291a11a0f'
      },
      json: {
        "q":message,
        "project": "test",
        "model": "model_20180530-222954"
      }

    },function(err, response, body){
      if(err){
        console.log(err)
        
      } else {
        console.log('-=-=-=-=',body)
        dataToSend = body;
        

      }
    })
    */
    console.log(dataToSend,'90-0=-9-0--=0-9')
      request({
      method: 'GET',
      url:'http://52.15.46.77:3001/getall/?sentence=why%20is%20india%20like%20this',
    },function(err, response, body){
      if(err){
        console.log(err)
      } else {
        console.log('-=-=-=-=',body)
        dataToSend = dataToSend + body;
        
      }
    })


    return bot.reply(update, dataToSend);
  }
});

botmaster.on('error', (bot, err) => { // added
  console.log(err.stack); // added
}); // added
