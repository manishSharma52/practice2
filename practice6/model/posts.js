const mongoose = require('mongoose')
// const user = require('./user')

const postSchema = mongoose.Schema({
    postdata: String,
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    day: {
        type : Date,
        default: Date.now
    }
   
})

module.exports =mongoose.model("post", postSchema)