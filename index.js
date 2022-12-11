const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uvhk0wp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const projectCollection = client.db('portfolio1').collection('projectApi');

        app.get('/projects', async (req, res) => {
            const query = {};
            const projects = await projectCollection.find(query).toArray();
            console.log(projects);
            res.send(projects)
        })
        app.get('/projectDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const projects = await projectCollection.find(query).toArray();
            console.log(projects);
            res.send(projects)
        })
    }

    finally {

    }
}
run().catch(console.log());






app.get('/', async (req, res) => [
    res.send('Portfolio server is running')
])
app.listen(port, () => {
    console.log(`Portfolio server is runing on ${port}`);
})