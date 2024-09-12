// Environment Variable for MongoDB credentials
require("dotenv").config();

//require express & cors 
const express = require("express");
const cors = require("cors");

//require MongoDB client
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Express App
const app= express();
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());

// To connect MongoDB cluster
const uri = process.env.ATLAS_URI;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const userCollections = client.db("userDB").collection("users");

    // Read Users
    app.get('/users', async (req, res) => {
      const cursor = userCollections.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    
    // Upload a new user
    app.post('/users', async(req, res)=>{
      const user = req.body;
      console.log('New User', user);
      const result = await userCollections.insertOne(user);
      res.send(result);
    })

    // Delete a user
    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      console.log(id, 'Deleted');
      const query = {_id: new ObjectId(id)};
      const result = await userCollections.deleteOne(query);
      res.send(result);
      
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send(`SIMPLE CRUD IS RUNNING`)
})

app.listen(port, ()=>{
    console.log(`SIMPLE CRUD IS RUNNING on PORT, ${port}`);
    
})