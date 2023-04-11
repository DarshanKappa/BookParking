import adminClientPromise from "utils/mongodb";


async function CreateStudent(req, res) {

    let data = req?.body

    console.log(data)

    const client = await adminClientPromise;

    const created = await client
        .db("test-student-db")
        .collection("student")
        .insertOne(data)

    console.log(created)

    return res.status(201).json(data)
}

export default CreateStudent;
