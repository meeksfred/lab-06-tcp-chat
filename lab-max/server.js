'use strict';

const net = require('net');
const EE = require('events');

const Client = require('./model/client');

const PORT = process.env.PORT || 3000;
const group = [];
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', (client, string) => {
  client.nickname = string.trim();
  client.socket.write('Nickname changed to ' + `${client.nickname}\n`);
});

ee.on('\\all', (client, string) => {
  group.forEach( c => {
    c.socket.write(`${client.nickname}: ` + string);
  });
});

ee.on('\\dm', (client, string) => {
  group.forEach( c => {
    if (c.nickname === string.split(' ').shift()){
      client.socket.write('Message sent to' + ' ' + `${c.nickname}` + '\n');
      c.socket.write(`${client.nickname}: ` + string.split(' ').slice(1).join(' '));
    }
  });
});

ee.on('default', client => {
  client.socket.write('Not a command' + '\n');
});

ee.on('error', error => {
  console.error(error);
});

server.on('connection', socket => {
  var client = new Client(socket);
  group.push(client);

  socket.on('data', data => {
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('\\')){
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', client, data.toString());
  });

  socket.on('close', () => {
    group.forEach( c => {
      if (client.id === c.id){
        group.splice(group.indexOf(c), 1);
      }
    });
    ee.emit('\\all', client, 'has left the room.\n');
  });

  socket.on('error', error => {
    ee.emit('error', error);
  });
});

server.listen(PORT, () => {
  console.log('listening on port', PORT);
});
