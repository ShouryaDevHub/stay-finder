const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // dlt the previous data

  // initData apne aap me ek OBJECT hai or uss object me hum key data ko access kr rhe
  await Listing.insertMany(initData.data);
  console.log("data was initialize");
};

initDB();
