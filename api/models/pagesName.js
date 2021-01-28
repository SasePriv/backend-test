const mongoose = require('mongoose');

const pageNameSchema = mongoose.Schema(
    {
        namePage: {type: String, unique: true, required: true},
        clicked: {type: Boolean, default: false}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("PagesNames", pageNameSchema);