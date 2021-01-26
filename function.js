const { json } = require("express")


const returnResponse = (res, data)=>{
    res.status(201).json(data);
}
module.exports = {
    returnResponse
}