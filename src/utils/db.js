const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGOURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`Connected`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectToDb;
