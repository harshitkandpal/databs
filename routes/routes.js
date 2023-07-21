const express = require('express');
const router = express.Router();
const User = require(__dirname + '/../models/users.js');
const multer = require('multer');
const users = require('../models/users');

// image uploade
var storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null,__dirname+'/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single('image');

// insert an user into database
router.post('/add', upload,(req,res) => {
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:req.file.filename,
    });
    user.save().then(()=>{
        req.session.message={
        type: "success",
        message: "User added successfully!"};res.redirect("/");}).catch((err)=>{
            res.json({message:err.message, type: "danger"});
            req.session.message={
                type: "success",
                message: "User added successfully!"
            }});
        }
);

router.get('/', (req, res) => {
    User.find().exec()
      .then(users => {
        res.render('index', { users, title: 'Home page' });
      })
      .catch(err => {
        res.json({ message: err.message });
      });
  });

router.get("/add", (req, res) => {
    res.render(__dirname + '/../views/add.ejs',{title: 'Add Users'});
});

// edit users
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id)
    .then((user) => {
        if(user==null) {
             res.redirect('/');
        }else{
            res.render('edit', {user: user,title: 'Edit User'});
        }
    })
    .catch(err => {
        res.render('/');
    });
});

module.exports = router;