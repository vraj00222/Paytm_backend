const express = require('express');
const cors = require('cors');

const mainRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter);
console.log('Mounted routes under /api/v1:');
mainRouter.stack.forEach((layer) => {
  if (layer.route && layer.route.path) {
    const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
    console.log(methods, '/api/v1' + layer.route.path);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
console.log('Server is running at: http://localhost:3000');
console.log('Click the link to access: http://localhost:3000');