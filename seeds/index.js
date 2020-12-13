const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers")
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) +10;
    const camp = new Campground({
        author: "5fd2512f38061b2f68f7c84a",
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis quae deserunt libero quibusdam expedita sint, quos delectus ipsa tenetur voluptatem.",
        price, 
        geometry: {
          type: "Point",
          coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
        },
        images:  [
          {
            url: 'https://res.cloudinary.com/djwxdlujy/image/upload/v1607777230/YelpCamp/zvzlgloz0zzwnpxzs2jd.jpg',
            filename: 'YelpCamp/zvzlgloz0zzwnpxzs2jd'
          },
          {
            url: 'https://res.cloudinary.com/djwxdlujy/image/upload/v1607777230/YelpCamp/watb06urjn58tjmylfue.jpg',
            filename: 'YelpCamp/watb06urjn58tjmylfue'
          }
        ]
    })
    await camp.save();
  }
};

seedDB().then(() => {
    mongoose.connection.close();
});
