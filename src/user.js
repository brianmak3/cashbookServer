
const { find, save, update } = require('../database'),
    { returnResponse } = require('../function');
module.exports = (data, resp) => {
    var { action, user } = data,
        { _id, email, phone, username } = user;
    switch (action) {
        case 'Signup':
            find('Users', 'findOne',
                {
                    $or: [{ email }, { phone }, { username }],
                    _id: { $ne: _id }
                },
                { email: 1, phone: 1, username: 1 },
                (UserFound) => {
                    if (UserFound) {
                        var error = { error: 'Phone number already linked to another account', index: 2 };
                        if (UserFound.username === username)
                            error = { error: 'Username ' + username + ' is already taken', index: 0 }
                        else if (UserFound.email === email)
                            error = { error: 'Email is already registerd to another account', index: 1 }
                        returnResponse(resp, error)
                    } else {
                        update('Users', 'updateOne', { _id }, { $set: user }, () =>
                            returnResponse(resp, { success: 'Profile has been successfully updated', user })
                        )
                    }
                })
            break;
        case 'Login':
            find('Users', 'findOne', { phone }, {}, (res) => {
                if (!res)
                    save('Users', { phone }, (res) => returnResponse(resp, res))
                else
                    returnResponse(resp, res)
            })
            break;
        case '':
            break;
    }

}