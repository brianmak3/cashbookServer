const mongoose = require('mongoose'),
    userSchema = new mongoose.Schema({
        username: String,
        phone: { required: 1, type: String },
        image: String,
        email: String
    }),
    bookSchema = new mongoose.Schema({
        name: { required: true, type: String },
        createdBy: { required: true, type: String },
        dateCreated: { required: true, type: Number },
        totalCashIn: { default: 0, type: Number },
        totalCashOut: { default: 0, type: Number },
        sharedTo: [String]
    }),
    entrySchema = new mongoose.Schema({
        byId: { required: true, type: String },
        date: { required: true, type: Number },
        type: { type: String, required: true },
        remark: { required: true, type: String },
        amount: { type: Number, required: true },
        bookId: { type: String, required: true },
        comments: [
            {
                byId: { required: true, type: String },
                text: { required: true, type: String },
                date: { required: true, type: Number },
            }
        ]

    })

    module.exports = {
        Users: mongoose.model('users', userSchema),
        Books: mongoose.model('books', bookSchema),
        Entries: mongoose.model('entries', entrySchema)
    }