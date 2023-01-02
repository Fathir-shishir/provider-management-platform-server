const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors =require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//  user =PMP_DB
//   pass = Z75XB0wwlvKWxaZf 

app.get('/', (req, res) => {
    res.send('Hello everyone')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


const uri = "mongodb+srv://PMP_DB:Z75XB0wwlvKWxaZf@atlascluster.mg9eg8i.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect()
        const agreementsCollection = client.db('db_pmp').collection('agreements')
        const agreementsDetailsCollection = client.db('db_pmp').collection('agreementsDetails')
        const usersCollection = client.db('db_pmp').collection('users')
        const providersCollection = client.db('db_pmp').collection('providers')

        //  get all agreements
        app.get('/agreements',async(req,res)=>{
            const query = {}
            const cursor = agreementsCollection.find(query)
            const agreements = await cursor.toArray();
            res.send(agreements)
        })
        //post an agreements
        app.post('/agreements',async(req,res)=>{
            const newAgreement = req.body
            const result = await agreementsCollection.insertOne(newAgreement);
            res.send(result);
        })

        // get all agreements details
        app.get('/agreementsDetails',async(req,res)=>{
            const query = {}
            const cursor = agreementsDetailsCollection.find(query)
            const agreementsDetails = await cursor.toArray();
            res.send(agreementsDetails)
        })
        // post an agreements details
        app.post('/agreementsDetails',async(req,res)=>{
          const agreementsDetails = req.body
          const result = await agreementsDetailsCollection.insertOne(agreementsDetails);
          res.send(result);
      })
        // get filter agreement details
        app.get('/agreementsDetails/:id', async(req, res) =>{
          const id = req.params.id;
          const query = {agreementsId: id};
          const agreementsDetails = await agreementsDetailsCollection.find(query).toArray();
          res.send(agreementsDetails);
        })
         
       // post an user
       app.post('/users',async(req,res)=>{
        const users = req.body
        const result = await usersCollection.insertOne(users);
        res.send(result);
    })

    // post provider list
    app.post('/providers',async(req,res)=>{
      const providers = req.body
      const result = await providersCollection.insertOne(providers);
      res.send(result);
  })
  // get all provider details
  app.get('/providers',async(req,res)=>{
    const query = {}
    const cursor = providersCollection.find(query)
    const providers = await cursor.toArray();
    res.send(providers)
})



   // get filter provider details
  app.get('/providers/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {agreementsId: id};
    const providersDetails = await providersCollection.find(query).toArray();
    res.send(providersDetails);
  })
        
    }
    finally{

    }
}

run().catch(console.dir)


