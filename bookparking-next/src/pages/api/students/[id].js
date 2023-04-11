const data = require("data/entries.json");



function StudentId(req, res) {
    console.log(req.method)
    let { id } = req.query
    console.log(id)
    for(var i of data.entries){
        if(i.id==id){
            return res.status(200).json({data: i})
        }
    }
    res.redirect( "/api/hello")
}

export default StudentId;