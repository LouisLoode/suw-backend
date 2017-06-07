const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// set up a mongoose model
const UserSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    model: {
        type: String
    },
    system: {
        type: String
    },
    manufacturer: {
        type: String
    },
    local: {
        type: String
    },
    timezone: {
        type: String
    },
    os_version: {
        type: Number
    },
    build_number: {
        type: Number
    },
    is_tablet: {
        type: Boolean
    },
    location: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // create the geospatial index
    },
    story: [
      {
        latitude: { type: Number },
        longitude: { type: Number },
        altitude: { type: Number },
        speed: { type: Number },
        accuracy: { type: Number },
        date: { type: Date, default: Date.now }
      }
    ]
},{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

//Transform
UserSchema.options.toJSON = {
    transform(doc, ret) {

        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

    }
};

/**
 * Middleware for updating the date.
 */
UserSchema.pre('update',() => {

    this.update({},{ $set: { updated: new Date() } });

});

module.exports = Mongoose.model('User', UserSchema);
