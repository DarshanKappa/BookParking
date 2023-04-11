const data = require("data/entries.json");



function Students(req, res) {
    console.log(data)
    res.status(200).json({data})
}

export default Students;