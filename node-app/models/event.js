const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// set up a mongoose model
const EventSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['alert', 'queue'] // <-- @TODO
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    hashtag: {
      type: String
    },
    location: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // create the geospatial index
    },
    upvotes: [{type: Schema.ObjectId, ref: 'User'}],
    downvotes: [{type: Schema.ObjectId, ref: 'User'}]
},{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

//Transform
EventSchema.options.toJSON = {
    transform(doc, ret) {

        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

    }
};

/**
 * Middleware for updating the date.
 */
EventSchema.pre('update',() => {

    this.update({},{ $set: { updated: new Date() } });

});

module.exports = Mongoose.model('Event', EventSchema);
