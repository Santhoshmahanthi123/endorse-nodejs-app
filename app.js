const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./model/user')
const Blog = require('./model/blog')
const Visit = require('./model/visit')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/endorse',{useNewUrlParser: true})
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('home');
})
app.post('/user',(req,res)=>{
    const user = new User({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        email : req.body.email,
    });
    user
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message :'User created!',
            result : result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

app.get('/user', (req,res) => {
    User.find()
    .exec()
    .then(result => {
        console.log(result); 
        res.json({
            users : result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
})

app.post('/blog',(req, res) => {
 
    const blog = new Blog ({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
     });
    
    blog
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : "Blog created ",
            createdFood : blog,
        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
app.get('/blog', (req,res) => {
    Blog.find()
    .exec()
    .then(result => {
        console.log(result); 
        res.json({
            blogs : result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
})
app.post('/visit',(req,res)=>{
    Blog.findById(req.body.blogId)
    .then(blog => {
        if(!blog){
            return res.status(404).json({
                message : 'Blog not found!'
            });
        }
        const visit = new Visit({
            _id: mongoose.Types.ObjectId(),
            blog:req.body.blogId,
            user : req.body.userId
        });
       return blog.save() 
        
    })
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message : 'Visit is stored!',
            createdVrder :{
                _id:result._id,
                blog: result.title,
                user : result.name
            },
          
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    }); 
});
app.get('/visit', (req,res) => {
    Visit.find()
    .exec()
    .then(result => {
        console.log(result); 
        res.json({
            visit : result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
})

app.listen(port,()=>{
    console.log(`app started on port:${port}`);
})