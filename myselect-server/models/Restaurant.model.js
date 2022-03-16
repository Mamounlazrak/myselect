const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: String, 
        averagePrice: Number,
        location: String, 
        description: String, 
        imageURL: {
            type: String, 
            default: 'https://www.ramw.org/sites/default/files/styles/content/public/default_images/default-news.jpg?itok=jsMUP47r'
        },
        locationGPS: { type: { type: String }, coordinates: [Number] }
    },
    {
        timestamps: true,
    }
)

restaurantSchema.index({location: '2dsphere'})

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;