const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  imageUrl: String,
  body: String
})

const gameSchema = new mongoose.Schema({
  title: String,
  tags: String,
  price: String,
  url: String,
  imageUrl: String,
  description: String
})

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    main: String,
    lon: Number,
    lat: Number
  },
  lastUpdated: {
    day: String,
    month: String,
    date: Number,
    year: Number
  },
  sections: Array,
  weather: {
    main: String,
    temperature: Number,
    feels_like: Number,
    humidity: Number,
    visibility: Number
  },
  articles: [articleSchema],
  games: [gameSchema]
})

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema)
