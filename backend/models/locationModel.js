const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,

    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weather User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location
