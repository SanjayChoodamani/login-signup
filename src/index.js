const express = require("express")
const collection = require('./model')

const app = express()
const port = 8000

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs')

//static file path
app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res)=>{
    res.render("signup")
})

app.post('/signup', async (req, res)=>{

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const checkExisting = await collection.findOne({name: data.name});
    if(checkExisting){
        res.send("This Username is already Taken, try with othe username");
    }else{
        const userData = await collection.insertMany(data);
        res.render('home', {username: data.name})
    }
    
})

app.post('/login', async (req, res)=>{

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const checkExisting = await collection.findOne({name: data.name, password: data.password});
    if(checkExisting){
        res.render('home', {username: data.name})
    }else{
        res.send("Their is an error in username or passwrord")
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})