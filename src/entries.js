

const { find, save, update, remove } = require('../database'),
    { returnResponse } = require('../function');
module.exports = (data, resp) => {
    const { subData, action } = data,
        { bookId, _id, selected } = subData;
    switch (action) {
        case 'fetch':
            find('Entries', 'find', { bookId }, { __v: 0 }, (entries) => returnResponse(resp, entries))
            break;
        case 'create':
            if (!_id)
                save('Entries', subData, (entry) => returnResponse(resp, entry))
            else
                update('Entries', 'updateOne', { _id }, { $set: subData }, () => returnResponse(resp, subData))
            break;
        case 'delete':
            remove('Entries', 'deleteMany', { _id: { $in: selected } }, () =>returnResponse(resp, selected))
            break;

    }
}
