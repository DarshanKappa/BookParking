
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"


const client = new MongoClient(uri);

const dbname = "bank-test-db"

export const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }catch(e){
        console.log(`Error connecting to the database: ${e}`);
    } finally {
        await client.close();
    }
};

let adminClientPromise = client.connect();

export default adminClientPromise;

main()

const main = async ()=>{
    const client = adminClientPromise
    const t = await client.db("test").collection("first").find();
    console.log(t);

    


}

adminClientPromise.close()
