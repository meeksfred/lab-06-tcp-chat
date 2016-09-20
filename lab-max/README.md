#Chatroom

This is a simple chatroom created using the net module on Node. Below are instructions on how to start a local server, as well as how to connect a user(s). Each time a new user/client connects to the server, a new Client object is instantiated with a unique socket, id, and randomly generated nickname.

Commands you can use in the chatroom:
- \\nick (name) will change your chatroom nickname to whatever you pass as (name).
- \\all (message) will send an all chat to everyone who is connected to the chatroom.
- \\dm (nickname) (message) will send a direct message to an individual user.
- (control) + ] then (control) + ^ will disconnect you from the chatroom.

To start the server:
- From home directory, on command line type: node server.js. This will start the server on the default port 3000.
- To start on a custom port, type: node server.js PORT=(number).

To connect to the server:
- Open up a new instance of your shell
- From any directory, on command line type: telnet localhost (port number).
