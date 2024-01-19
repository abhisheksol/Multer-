const express = require('express');
const app=express()
const model = require('./mongoose');
const multer = require('multer');
const fs = require('fs'); 
const path = require('path');
const { get } = require('http');
const cors = require('cors');
 
const port=5000
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //to access the uploads file in URL


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
      //cb(null, `${Date.now}-${file.originalname}`)

    }
  })
   
  const upload = multer({ storage: storage })

  app.get("/getpdf",async(req,res)=>{ 
    const data=await model.find({}).lean()
    res.send({data})
   })

   app.post('/upload', upload.single('file'), async (req, res) => {   

     res.send('file uploaded')
     const newImage=new model({
      name:req.body.name, 
      img:{
        data:req.file.filename,
        contentType: req.file.mimetype
      }
     })
    //  react multer\multer\build
     app.use(express.static(path.join(__dirname,'./multer/build')))

     app.get('*',function(req,res) {
      res.sendFile(path.join(__dirname,"./multer/build/index.html"))
     })

     const saves=await newImage.save()
    //  console.log("this is saved data=> ",saves);
     

  
  })
  app.listen(process.env.PORT || port, ()=> console.log("listening to port 5000"))      