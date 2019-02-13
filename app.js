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
//API to create user
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
//api to get all the users
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

//api to post a blog/article
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

//api to get all the blogs
app.get('/blogs', (req,res) => {
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

//api to save user and blog information who are visiting a particular blog based on user and blog ids
app.post('/visit',(req,res)=>{
    User.findById(req.body.user)
    .exec()
    .then(user=>{
        Blog.findById(req.body.blog) 
        .exec()
        .then(result=>{
            const visit = new Visit({
                _id: mongoose.Types.ObjectId(),
                user :req.body.user,
                blog : req.body.blog
            });
           visit
           .save() 
           res.status(200).json({
                        message : 'Visit is stored!',
                        createdVisit : visit
                      
                    });
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err,
            });
        });

    })
    
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
        
    });
   
})

//api to get all the visits made bu users
app.get('/visits', (req,res) => {
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

//api to get the count based on no:of times a particular user visits a particular blog 
app.get('/blog', (req,res) => {
    Visit.find({user:req.body.user,blog:req.body.blog,date: { $gte: new Date('2019-02-13'), $lt: new Date('2020-02-13') }})
    .exec()
    .then(result => {
        console.log(result); 
        res.json({
            'no of times the given user visited blog is' : result.length,
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

// api to get the number of distinct or unique users visted the given blog
app.get('/unique', (req,res) => {
    Visit.find({blog:req.body.blog,date: { $gte: new Date('2019-02-13'), $lt: new Date('2020-02-13') }})
    .exec()
    .then(result => {
        console.log(result)
        let unique = [...new Set(result.map(item => item.user))];
        console.log(unique);
        res.json({
            'no of users visited the given blog is' : unique.length,
            'These are  the user ids visited the current blog' : unique
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