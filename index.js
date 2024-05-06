const express = require("express");
const app = express();

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

const {v4 : uuidv4} = require("uuid");
// uuidv4();

let posts = [
    {
        id : uuidv4(),
        username: "aniket",
        content: "this post is related to me."
    },
    {
        id : uuidv4(),
        username: "chouhan",
        content: "this post is about chouhans."        
    }, 
    {
        id : uuidv4(),
        username: "sansu",
        content: "this post is about sansu."
    }];

const path = require("path");
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));    // setting views folder
app.use(express.static(path.join(__dirname, "public")));    // setting public folder

app.use(express.urlencoded({ extended: true })); // url se data samjhne ke liye

const port = 8080;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});

app.get("/", (req, res) => {      // a basic response
    res.send("server working well.");

});


// CRUD Operations using REST

// read - GET
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});

});


// create - POST
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({ id,username,content });
    res.redirect("/posts");
});


// to see any particular post - get

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);
    res.render("show.ejs",{post});

});



// Update - PUT or PATCH

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    let newContent = req.body.content;
    post.content = newContent;
    // console.log(newContent);
    res.redirect("/posts");
    
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs",{post});
});


// delete - DELETE

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

