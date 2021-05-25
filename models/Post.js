var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
/*
Collection Name: PostSchema
*/
var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: { 
        type: ObjectId, 
        ref: 'category', 
        required: true 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

/**
 * Check data integrity
 */
PostSchema.pre("save", true, async function(next, done) {
    var self = this;

    // Check if category is valid
    var category = await mongoose.models["category"].findOne({ _id: self.category, isDeleted: false });
    console.log("category", category);
    if(!category) {
        self.invalidate("category", "Given category is not valid");
        return done(new Error("Given category is not valid"));
    }
    done();
    return next();
});

/**
 * Image paths in post hooks
 */
PostSchema.post('init', async function (doc) {
    doc.image = process.env.IMAGE_SERVER_DOMAIN + "/posts/" + doc.image;
    doc.qrCode = process.env.IMAGE_SERVER_DOMAIN + "/QR/" + doc._id + ".png";
});

module.exports = mongoose.model('post' , PostSchema);