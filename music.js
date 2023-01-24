// Kelly Jiang  Periods 7+8 Odd  1/23/23
const express = require('express');
const { parse } = require('path');
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to Kelly\'s music home page!');
});

const music = [
    {id:1 , genre:'Pop', month:4 , year:1975},
    {id:2 , genre:'Hip Hop', month:7, year:2014},
    {id:3 , genre:'Rap', month:5, year:1999},
    {id:4 , genre:'Classical', month:3, year:2016},
    {id:5 , genre:'Rock', month:7, year:1987},
    {id:6 , genre:'Jazz', month:8, year:2023},
    {id:7 , genre:'Blues', month:2, year:1968},
    {id:8 , genre:'Electronic', month:4 , year:2012}
]

app.listen(3000,()=>{
    console.log('Listening on part 3000')
});

// GET requests ---------------------------------------------------
app.get('/api/music',(req,res)=>{
    res.send(music);
});

app.get('/api/music/:id',(req,res)=>{
    const gen = music.find(g=> g.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send("Genre with the given ID was not found.");
        return
    }
    res.send(gen);
});

app.get('/api/music/monthyear/:month/:year',(req,res)=>{
    for(i=0;i<music.length;i++)
    {
        if(music[i].month===parseInt(req.params.month)&&music[i].year===parseInt(req.params.year))
        {
            res.send(music[i]);
            return
        }
    }
    res.status(404).send("Genre with the given month and year was not found.");
});

// POST request ---------------------------------------------------
app.post('/api/music',(req,res)=>{
    if(req.body.genre.length>=3)
    {
        const mus ={
            id: music.length+1,
            genre: req.body.genre,
            month: parseInt(req.body.month),
            year: parseInt(req.body.year)
        }
        music.push(mus);
        res.send(mus);
    }
    res.status(404).send("The genre name needs to be 3 or more characters long.");
});

// PUT requests ---------------------------------------------------
app.put('/api/music/:id',(req,res)=>{
    const gen = music.find(g=> g.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send("Genre with the given ID was not found.");
        return
    }
    if(req.body.genre.length<3)
    {
        res.status(404).send("The genre name needs to be 3 or more characters long.");
    }
    mus ={
        id:req.params.id,
        genre:req.body.genre,
        month:req.body.month,
        year:req.body.year
    }
    music[req.params.id]=mus;
    res.send(music[req.params.id]);
});

// DELETE requests --------------------------------------------------
app.delete('/api/music/:id',(req,res)=>{
    const gen = music.find(g=> g.id === parseInt(req.params.id));
    if(!gen){
        res.status(404).send("The genre with the given ID was not found.");
        return
    }
    music.splice(music.indexOf(gen),1);
    res.status(200).send("Genre successfully deleted.");
});

// Reflection:
// Programs communicate with each other to update and recieve information from the backend.
// I learned to create different filters, ex: month+year
// I can create more filters or create different error messages for different situations.