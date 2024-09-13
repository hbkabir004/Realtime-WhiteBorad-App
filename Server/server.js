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

    // const userCollections = client.db("userDB").collection("users");
    const WhiteBoardCollections = client.db("wbdb").collection("WhiteBoardCollections");
    
    // Get All Drawings
    app.post('/api/drawings', async (req, res) => {
      const { title, elements } = req.body;

      try {
        const newDrawing = {
          title,
          elements,
          createdAt: new Date(),
        };

        const result = await WhiteBoardCollections.insertOne(newDrawing);
        res.status(201).json(result.ops[0]);
      } catch (err) {
        res.status(500).json({ error: 'Failed to create drawing' });
      }
    });

    // Get a Specific Drawing by ID
    app.get('/api/drawings/:id', async (req, res) => {
      try {
        const drawing = await WhiteBoardCollections.findOne({ _id: ObjectId(req.params.id) });
        
        if (!drawing) {
          return res.status(404).json({ error: 'Drawing not found' });
        }
        
        res.json(drawing);
      } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve drawing' });
      }
    });

    // Create a New Drawing
    app.post('/api/drawings', async (req, res) => {
      const { title, elements } = req.body;

      try {
        const newDrawing = {
          title,
          elements,
          createdAt: new Date(),
        };

        const result = await WhiteBoardCollections.insertOne(newDrawing);
        res.status(201).json(result.ops[0]);
      } catch (err) {
        res.status(500).json({ error: 'Failed to create drawing' });
      }
    });

    // Update a Drawing
    app.put('/api/drawings/:id', async (req, res) => {
      const { title, elements } = req.body;

      try {
        const updatedDrawing = await WhiteBoardCollections.findOneAndUpdate(
          { _id: ObjectId(req.params.id) },
          { $set: { title, elements } },
          { returnOriginal: false }
        );

        if (!updatedDrawing.value) {
          return res.status(404).json({ error: 'Drawing not found' });
        }

        res.json(updatedDrawing.value);
      } catch (err) {
        res.status(500).json({ error: 'Failed to update drawing' });
      }
    });    

    // Delete a Drawing
    app.delete('/api/drawings/:id', async (req, res) => {
      try {
        const result = await WhiteBoardCollections.deleteOne({ _id: ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Drawing not found' });
        }

        res.json({ message: 'Drawing deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete drawing' });
      }
    });
 

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