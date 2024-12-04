const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    expirationDate: Date,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Package', packageSchema);