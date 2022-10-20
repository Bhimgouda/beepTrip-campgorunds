const mongoose = require("mongoose");
const Campground = require("../models/campground");
const location = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/beep-trip")
  .then(() => console.log("SEEDED DATA"))
  .catch((err) => console.log(err));

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${location[rand1000].city}, ${location[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          filename: "beepTrip/yce3bzzndstswp6hoa4r",
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666263072/beepTrip/yce3bzzndstswp6hoa4r.jpg",
        },
        {
          filename: "beepTrip/qrjziqy2mq0u5kcbwgho",
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666263072/beepTrip/qrjziqy2mq0u5kcbwgho.webp",
        },
        {
          filename: "beepTrip/u2qbzijsf9n4mpooiluv",
          url: "https://res.cloudinary.com/ddmnigwse/image/upload/v1666263073/beepTrip/u2qbzijsf9n4mpooiluv.jpg",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laboriosam quia iusto corporis similique recusandae magnam perferendis ipsa nulla id!",
      price,
      author: "6347c18f974576c08028b737",
    });
    await camp.save();
  }
  await mongoose.connection.close();
};

seedDB();
