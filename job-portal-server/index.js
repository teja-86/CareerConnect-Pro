import express from 'express';
import path from 'path';
import cors from 'cors';
import { MongoClient , ObjectId, ServerApiVersion} from 'mongodb';
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../job-portal-client/dist')));
dotenv.config()
console.log(process.env.DB_USER);

// middleware
app.use(express.json());
app.use(cors());

// username : rangadharmateja0
// password : SlxixFPCydiVpqm0


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.elm1rjv.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  // useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    // create db

    const db = client.db('mernJobPortal');
    const jobsCollections = db.collection("demoJobs");

    // post a job
    app.post("/post-job", async (req, res) => {
        const body = req.body;
        body.createAt = new Date();
        const result = await jobsCollections.insertOne(body);
        if(result.insertedId) {
            return res.status(200).send(result);
        } 
        else {
            return res.status(404).send({
                message : "Cannot insert! try again",
                status : false
            })
        }
    })

    // get all jobs
    app.get('/all-jobs', async (req, res) => {
        const jobs = await jobsCollections.find().toArray()
        res.send(jobs);
    })
    // get single job using id
    app.get('/all-jobs/:id', async(req, res) => {
      const id = req.params.id;
      const jobs = await jobsCollections.findOne({
        _id : new ObjectId(id)
      })
      res.send(jobs)
    })
    // get jobs by email
    app.get('/myJobs/:email', async(req, res) => {
      console.log(req.params.email);
      const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
      res.send(jobs)
    })
    // delete job
    app.delete('/job/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const result = await jobsCollections.deleteOne(filter);
      res.send(result)
    })
    // update a job
    app.patch('/update-job/:id', async(req, res) => {
      const id = req.params.id;
      const jobDate = req.body;
      const filter = {_id : new ObjectId(id)};
      const options = {upset : true}
      const updateDoc = {$set : {...jobDate}};
      const result = await jobsCollections.updateOne(filter, updateDoc, options)
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}

run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send("Hellp Teja Your are the full stack developer")
// })




app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../job-portal-client/dist', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})