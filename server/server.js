const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server

  const fileName = (new Date()).getTime() + '_' + sampleFile.name

  sampleFile.mv('./uploads/' + fileName, function(err) {
    if (err)
      return res.status(500).send(err);
    else{
    }

    res.send({ success : true, fileName : fileName });
  });
});

app.listen(8000, function(e){
    console.log('Server running on 8000')
});
