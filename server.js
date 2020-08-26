const net = require('net');
const port = 3000;
const fs = require('fs');

const server = new net.Server();

server.listen(port, function () {
  console.log(`localhost:${port}`);
});

server.on('connection', function (socket) {
  console.log('someone has connected!');
  socket.setEncoding('utf8');
  socket.write('Response from the server: successful connection!\n');
  socket.on('data', function (chunk) {
    fs.readFile(`./files/${chunk}`, function (err, data) {
      if (err) {
        socket.write(`Sorry, could not find file`);
      } else {
        console.log(`file found! sending the file!`);
        socket.write(data);
      }
    });
    console.log(`someone has requested the file ${chunk}`);
  })
});