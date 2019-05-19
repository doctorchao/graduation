const mongoose = require('mongoose')

const comModel = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    return: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment'
    }
    
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('comment', comModel)