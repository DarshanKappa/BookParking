import { apiView } from "utils/api_view";
import adminClientPromise from "utils/mongodb";



class Student {

    async get(req, res) {
        console.log(req.method)

        const client = await adminClientPromise;

        const list = await client
            .db("test-student-db")
            .collection("student")
            .find()
            .toArray()

        return res.status(200).json({
            data: list
        })

    }

    async post(req, res) {
        let data = req?.body

        const client = await adminClientPromise;

        const created = await client
            .db("test-student-db")
            .collection("student")
            .insertOne(data)

        console.log(created)

        return res.status(201).json(data)
    }




}


export default apiView(Student);
