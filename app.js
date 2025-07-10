const express = require('express');
const app = express();

app.set('view engine', 'ejs'); //set engine

app.get('/', (req, res) => {  
  res.render('index');  
});


app.get('/captcha', (req,res) => {
  let captcha = svgCaptcha.crate({
                size:5,
                noise:3,
                background:'#fff'
  })
  req.session.captcha = captcha.text
  res.type('svg')
  res.status(200)
  res.send(captcha.data)
})


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});