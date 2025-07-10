const express = require('express');
const app = express();

app.set('view engine', 'ejs'); //set engine

app.get('/', (req, res) => {  
  res.render('view/index');  
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});