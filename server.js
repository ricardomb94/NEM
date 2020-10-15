const http = require('http');
const { brotliDecompressSync } = require('zlib');

const todos = [
  { id: 1, text: 'Todo One' },
  { id: 2, text: 'Todo Two' },
  { id: 3, text: 'Todo Three' }
];

const server = http.createServer((req, res) => {
  // let Pull out method and the url from the req object, using destructuring
const { method, url} = req;
 
 
  // let initialize a body array and push onto it the chunk parameter of the function.
  let body = [];

  //  to make a request on data and to listen to some events let set req.on()
  // And then sent a buffer in the body
  req.on('data', chunk => {
   body.push(chunk);
  }).on('end', () => {
   body = Buffer.concat(body).toString();

  //  Let initialize code status set as 404 by default
   let status = 404;

  //  Let create a const for response
  const response = {
    success: false,
    data: null,
    error:null
  }

  if(method === 'GET' && url ==='/todos'){
    status = 200;
    response.success = true
    response.data = todos;
  } else if(method === 'POST' && url === '/todos'){
    const {id, text} = JSON.parse(body);
    todos.push({id, text});

    if(!id || !text){
      status = 400;
      response.error = "Please add id and text";
    }else{
      status = 201;
    response.success = true;
    response.data = todos;
    }
    
  }

  res.writeHead(status, {
    'Content-Type': 'application/json',
    'X-Powered-by': 'Node.js'
  });

  res.end(
      JSON.stringify(response)
    );
  })
});

const PORT = 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
