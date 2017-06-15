const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// set up a mongoose model
const EventSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['party', 'music', 'food', 'cultural', 'incident', 'sport', 'waiting', 'march', 'misc']
    },
    nbr_participant: {
      type: Number,
      required: true
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
    is_activate: {
      type: Boolean,
      default: true
    },
    location: {
      type: [Number],  // [<latitude>, <longitude>]
      index: '2dsphere'      // create the geospatial index
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
