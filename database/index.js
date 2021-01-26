const Tables = require('./schemas'),
    response = (err, result, callback) => {
        if (err)
            throw err
        else
            callback(result)
    },
save = (table, data, callBack)=>{
    const Table = new Tables[table](data);
            Table.save((err, result)=>response(err, result, callBack))
},
find = (table, qty, query, project, callBack) => {
        Tables[table][qty](query,  project, (err, result) => response(err, result, callBack))
},
update = (table, qty, query, update, callBack) => {
    Tables[table][qty](query,  update, (err, result) => response(err, result, callBack))
},
remove = (table, qty, query, callBack) => {
    Tables[table][qty](query,  (err, result) => response(err, result, callBack))
},
aggregate = (table, array, project, callBack) => {
    Tables[table].aggregate(array).excec((err, result) => response(err, result, callBack))
}
module.exports = {
    find,
    update,
    remove,
    aggregate,
    save
}
