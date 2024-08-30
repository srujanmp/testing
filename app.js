const express = require('express')  //imports module express
const app = express()  //creates express app 
const bodyParser=require("body-parser"); //used for form submission


const mongoose=require('mongoose');

(async () => {await mongoose.connect('mongodb+srv://admin:admin@cluster.dxkcct4.mongodb.net/testing?retryWrites=true&w=majority&appName=cluster');})();

const UserSchema = new mongoose.Schema({
    username : String ,
    password : String
});

const User = mongoose.model('User', UserSchema);






app.set('view engine','ejs');   //to set templating engine or view engine as ejs
app.set('views',__dirname+'/views');   // to set views folder

app.use(bodyParser.urlencoded({extended:false}));   //used for form submission



app.get('/', (req, res) => {  //express app get method

    res.send('root directory');

})

app.get('/home', (req, res) => {   //express app get home page
    res.render('index');

})

app.get('/login', (req, res) => {   //express app get login page
    res.render('login');

})

app.post('/login',(req,res)=>{


    const user1 = new User({ username: req.body.username, password: req.body.password });

    (async () => { await user1.save(); })();

    res.redirect('/home');
    
})




app.use('/',(req,res)=>{                    // use method is middleware or its default case

    res.send("page not found");
    
})


app.listen(3000);