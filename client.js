//Enter a file name as a command line argument to attempt to retrieve it from the server

let fileName = process.argv[2];

const net = require('net');
const connect = function () {
  const conn = net.createConnection({
    host: 'localhost',
    port: 3000
  });
  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log("Successful connection!");
    console.log(`Requesting the file ${fileName}`)
    conn.write(fileName);
  })
  conn.on('data', (data) => {
    console.log(`here is the file:`)
    console.log(data);
  })

  return conn;
}

connect();