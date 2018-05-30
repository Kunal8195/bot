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

const socketioBot = new SocketioBot(socketioSettings);
botmaster.addBot(socketioBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Good One');
  }
});

botmaster.on('error', (bot, err) => { // added
  console.log(err.stack); // added
}); // added
