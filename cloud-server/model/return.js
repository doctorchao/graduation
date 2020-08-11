const mongoose = require('mongoose')

const reModel = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    index: {
        type: Number,
        default: 1
    }
    
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('returns', reModel)