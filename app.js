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

app.all('/webboard/new-question', (req,res) => {
  if (req.method == 'GET') { 
    res.render('new-question')
    return
  }
  let form = new formidable.IncomingForm()
  form.parse(req,(err ,fields, files)=>{
    res.render('new-question',{
      msg : 'try agin', data:fields
    })
    return
  })

  let upfile  = files.upfile
  let imgFile  = upfile.name

  if (imgFile != ''){
    const dir = 'public/webboard-images/'
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
    questioner : fields.qusetioner,
    date_posted: new Date(),
    num_answer: 0,
    image_file: imgFile
  }
  Question.create(data,(err,doc)=>{
    res.redirect('/webboard/show-all-questions')
  })
})

app.get('/webboard/show-all-question',(req,res)=>{
  let q = Question.find().sort('-date_posted')
  let options = { page: req.query.page || 1,limit: 3}
  Question.paginate(package,options,(err,result) =>{
    let links = []
    if (result.page > 1) {
      links.push(`<a href="${req.path}?page=1">First page</a>`)
    }
    if (result.hasPrevPage){
      links.push(`<a href="${req.path}?page=${result.prevPage}">Previous page</a>`)
    }
    if (result.hasNextPage){
      links.push(`<a href="${req.path}?page=${result.nextPage}"> Next page</a>`)
    }
    if (result.page < result.totalPages){
      links.push(`<a href="${req.path}?page=${result.totalPages}">Last page</a>`)
    }
    let pageLink = links.join(' - ')
    res.render('show-all-questions',
      { data: result.docs,pageLink:pageLink}
    )    
  })
})


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});