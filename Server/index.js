const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./db');
const e = require('express');

const app = express();
const Router = express.Router();
const PORT = 5000;



//middleware
app.use(cors());
app.use(express.json());

//ROUTES


//Create todo
app.post('/todos',async (req,res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
        return res.status(200).json({ message:"successfully insert" });
        //console.log(newTodo);
    } catch (err) {
        console.log(err.message);
    }
})


//get all todos
app.get('/todos',async (req,res) => {
    try{
        const allTodo = await pool.query("SELECT * FROM todo");
       return res.json(allTodo.rows);
    }
    catch(err){
        console.log(err);
    }
});

//get a todo
app.get('/todos/:id', async (req,res) => {
    try{
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        return res.json({});
    }
    catch(err) {
        console.log(err);
    }
    
});

//update

app.put('/todos/:id',async (req,res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;
        console.log(id);
        console.log(description);
        const UpdateQuery = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id]);
        return res.json({ message:"successfully updated" });
    }
    catch(err) {
        console.log(err);
    }
});

app.delete('/todos/:id',async (req,res) => {
    try {
        const { id } = req.params;
        const deletes = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
       return res.json({ messege:"Deleted" });
    } catch (error) {
        console.log(error);
    }
})



app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
});