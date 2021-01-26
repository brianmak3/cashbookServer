
const { find, save, update, remove } = require('../database'),
    { returnResponse } = require('../function');
module.exports = (data, resp) => {
    var { action, subData } = data,
        { _id, userId, selectedBooks } = subData;
    switch (action) {
        case 'create':
            if (!_id)
                save('Books', subData, (book) => returnResponse(resp, book))
            else
                update('Books', 'updateOne', { _id }, { $set: subData }, () => returnResponse(resp, subData))
            break;
        case 'update':
            console.log(data)
            break;
        case 'fetch':
            find('Books', 'find', { $or: [{ createdBy: userId }, { sharedTo: userId }] }, { __v: 0 }, (books) => {
                // fetch Information of shared users
                returnResponse(resp, books)
            })
            break;
        case 'delete':
            remove('Books', 'deleteMany', { _id: { $in: selectedBooks } }, () =>
                remove('Entries', 'deleteMany', { bookId: { $in: selectedBooks } }, () =>returnResponse(resp, selectedBooks))
            )
            break;
    }

}