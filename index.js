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
    res.send('Hello World!')
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

        //  get all agreements
        app.get('/agreements',async(req,res)=>{
            const query = {}
            const cursor = agreementsCollection.find(query)
            const agreements = await cursor.toArray();
            res.send(agreements)
        })
        //  Post an agreements
        app.post('/agreements',async(req,res)=>{
          
          const newAgreements = req.body
          console.log(newAgreements)
          console.log(arguments)
          const result = await agreementsCollection.insertOne(newAgreements)
         
          res.send(result)
      })

      // get all agreements details
     
      app.get('/agreementsDetails',async(req,res)=>{
        const query = {}
        const cursor = agreementsDetailsCollection.find(query)
        const agreementsDetails = await cursor.toArray();
        res.send(agreementsDetails)
    })

   // get single agreements details
      app.get('/agreementsDetails/:agreementsDetail',async(req,res)=>{
        const id = req.params.agreementsDetail
        const query = {_id:ObjectId(id)}
        const agreementsDetail = await agreementsDetailsCollection.findOne(query)
        res.send(agreementsDetail)
    })



    
    }
    finally{

    }
}

run().catch(console.dir)


