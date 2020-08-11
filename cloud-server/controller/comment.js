const comModel = require('../model/comment')
const bookModel = require ('../model/book')
const mongoose = require('mongoose')
const userModel = require ('../model/user')

async function doComment (req, res, next) {
    try {
        const {userId} = req.user
        const {content} = req.body
        const {id} = req.body
        console.log(id, '书籍id')
        await comModel.create({
            user: mongoose.Types.ObjectId(userId),
            content
        })
        const comment =  await comModel.findOne().sort({_id: -1})
        const book = await bookModel.findById(id)
        console.log(comment, '评论')
        console.log(book, '书籍')
        if (comment && book){
            await book.comments.push(comment._id)//把bookId推入books
            await book.save()
            res.json({
                code:200,
                msg: '发表成功'
            })
        } else{
            res.json({
                code: 400,
                msg: '评论失败请重新评论'
            })
        }
        
    } catch (err) {
        next(err)
    }
}
async function getComment (req, res, next) {
    try {
        const {id} = req.body
        const book = await bookModel.findById(id)
            .populate({
                path: 'comments',
                sort: {_id: -1}
            })
        for (let i = 0; i<book.comments.length; i++) {
            let id = book.comments[i].user
            const user = await userModel.findById(id).select('-password')
            book.comments[i].user = user
        }
        res.json({
            code: 200,
            data: book.comments,
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    doComment,
    getComment
}