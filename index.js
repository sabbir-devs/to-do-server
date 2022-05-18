const express = require('express');
const app = express()
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://to_do_app:7tyOJ4kZRYDkuHbC@cluster0.ut9au.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try{
        client.connect()
        const taskCollection = client.db("toDoApp").collection("task");
        
        app.get('/task', async(req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        // post
        app.post('/task', async(req, res) => {
            const task = req.body.data;
            const result = await taskCollection.insertOne(task)
            console.log(result)
            res.send(result)
        })

        // delete 
        app.delete('/task/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id: ObjectId(id)};
            const result = await taskCollection.deleteOne(query);
            res.send(result)
        })
    }finally{

    }
    
    app.get('/', async(req, res) => {
        res.send('Hello From To Do Server')
    })
    
   





}
run().catch(console.dir)


app.listen(port, () => {
    console.log('To do is running on', port)
})