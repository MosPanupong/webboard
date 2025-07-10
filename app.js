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

app.all('/webboard/newquestion', (req,res) => {
  if (req.method == 'GET') { 
    response.render('new-question')
    return
  }
  let form = new formidable.IncomingForm()
  form.parse(req,(err ,filelds,flies)=>{
    res.render('new-question',{
      msg : 'try agin', data:fields
    })
    return
  })

  let upfile  = files.upfile
  let imgFile  = upfile.name

  if (imgFile != ''){
    const dir = 'pubilc/webboard-images/'
    let oldName = imgFile.split('.')
    oldName[0] = new Date().getTime()
    imgFile = oldName.join('.')
    let imgPath = dir + imgFile

    sharp(upfile.path)
    .resize({width: 600,withoutEnlargement:true})
    .toFile(imgFile,err => {})
  }
  let data = {
    question: fields.question,
    detail: fields.detail,
    qusetioner : fields.qusetioner,
    date_posted: new Date(),
    num_answer: 0,
    image_file: imgFile
  }
  Question.crate(data,(err,doc)=>{
    res.redirect('/webboard/show-all-questions')
  })
})


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});