const reModel = require('../model/return')
const comModel = require ('../model/comment')
const mongoose = require('mongoose')
const userModel = require ('../model/user')

async function doReturn (req, res, next) {
    try {
        const {userId} = req.user
        const {content} = req.body
        const {id} = req.body
        console.log(id, '评论id')
        await reModel.create({
            user: mongoose.Types.ObjectId(userId),
            content
        })
        const returns = await reModel.findOne().sort({_id: -1})
        const comment = await comModel.findById(id)
        console.log(comment, '评论')
        console.log(returns, '回复')
        if (comment && returns){
            await comment.returns.push(returns._id)//把bookId推入books
            await comment.save()
            res.json({
                code:200,
                msg: '回复成功'
            })
        } else{
            res.json({
                code: 400,
                msg: '回复有误'
            })
        }
        
    } catch (err) {
        next(err)
    }
}
async function getReturn (req, res, next) {
    try {
        const {id} = req.body
        const comment = await comModel.findById(id)
            .populate({
                path: 'returns',
                sort: {_id: -1}
            })
            .populate({
                path: 'user'
            })
        for (let i = 0; i<comment.returns.length; i++) {
            let id = comment.returns[i].user
            const user = await userModel.findById(id).select('-password')
            comment.returns[i].user = user
        }
        res.json({
            code: 200,
            data: comment.returns,
            comment
        })
    } catch (err) {
        next(err)
    }
}
module.exports = {
    doReturn,
    getReturn
}