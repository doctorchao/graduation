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
    returns: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'returns'
    }],
    index: {
        type: Number,
        default: 1
    }
    
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('comment', comModel)