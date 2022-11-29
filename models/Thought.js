const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: userSchema.username,
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;