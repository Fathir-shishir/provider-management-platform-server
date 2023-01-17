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
        const selectedProfileCollection = client.db('db_pmp').collection('selectedProfiles')
        const reviewCollection = client.db('db_pmp').collection('reviews')

        //  get all agreements
        app.get('/agreements',async(req,res)=>{
            const query = {}
            const cursor = agreementsCollection.find(query)
            const agreements = await cursor.toArray();
            res.send(agreements)
        })
        // get single agreements 
        app.get('/agreements/:id',async(req,res)=>{
          const id = req.params.id
          const query = {_id: ObjectId(id)}
          const result = await agreementsCollection.findOne(query)
          res.send(result)
      })

      //  get single providers 
       app.get('/provider/:id',async(req,res)=>{
        const id = req.params.id
        const query = {_id: ObjectId(id)}
        const result = await providersCollection.findOne(query)
        res.send(result)
    })
        
       // update an agreements
       app.put('/agreements/:id',async(req,res)=>{
        const id = req.params.id
        const updatedAgreements = req.body
        const filter = {_id: ObjectId(id)}
        const options = { upsert : true }
        const updatedDoc = { $set : updatedAgreements}
        const result = await agreementsCollection.updateOne(filter,updatedDoc,options)
        res.send(result)
    })
  // update provider 
    app.put('/provider/:id',async(req,res)=>{
      const id = req.params.id
      const updatedprovider = req.body
      const filter = {_id: ObjectId(id)}
      const options = { upsert : true }
      const updatedDoc = { $set : updatedprovider}
      const result = await providersCollection.updateOne(filter,updatedDoc,options)
      res.send(result)
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
    // get selected profile
    app.get('/selectedProfile',async(req,res)=>{
      const query = {}
      const cursor = selectedProfileCollection.find(query)
      const selectedProfile = await cursor.toArray();
      res.send(selectedProfile)
  })

  //post selected profile
    app.post('/selectedProfile',async(req,res)=>{
      const selectedProfile = req.body
      const result = await selectedProfileCollection.insertOne(selectedProfile);
      res.send(result);
  })
  // get all provider details
  app.get('/providers',async(req,res)=>{
    const query = {}
    const cursor = providersCollection.find(query)
    const providers = await cursor.toArray();
    res.send(providers)
})

//  add review 

app.post('/review',async(req,res)=>{
  const review = req.body
  const result = await reviewCollection.insertOne(review);
  res.send(result);
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


