import adminClientPromise from "utils/mongodb";


async function ListOfStudent(req, res) {

    console.log(req.method)
    
    const client = await adminClientPromise;


    const list = await client.db("test-student-db").collection("student").find().toArray()

    console.log(list)

    console.log()

    return res.status(200).json({
        data: list
    })


}

export default ListOfStudent;