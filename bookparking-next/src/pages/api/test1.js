


const Test1 = (req, res) => {
    console.log(req.query)
    res.status(200).json(req.query)
}

export default Test1;
