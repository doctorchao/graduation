const comModel = require('../model/comment')
const mongoose = require('mongoose')

async function doComment (req, res, next) {
    try {
        const {userId} = req.user
        const {content} = req.body
        await comModel.create({
            user: mongoose.Types.ObjectId(userId),
            content
        })
        res.json({
            code:200,
            msg: '发表成功'
        })
    } catch (err) {
        next(err)
    }
}
async function getComment (req, res, next) {
    try {
        const {bookId} = req.body 
        await comModel.create({
            user: mongoose.Types.ObjectId(userId),
            content
        })
        res.json({
            code:200,
            msg: '发表成功'
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    doComment,
    getComment
}