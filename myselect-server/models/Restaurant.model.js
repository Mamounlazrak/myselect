const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: String, 
        location: String, 
        description: String, 
        imageURL: {
            type: String, 
            default: 'https://www.ramw.org/sites/default/files/styles/content/public/default_images/default-news.jpg?itok=jsMUP47r'
        }
    },
    {
        timestamps: true,
    }
)

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;