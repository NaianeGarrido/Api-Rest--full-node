import mongoose from "../config/mongoose";
const {Schema} = mongoose

const Stormtrooper = new Schema({
  name: String,
  nickname: String,
  divisions: [String],
  patent: {
    type: String,
    enum: ['General', 'Colonel', 'Major', 'captain', 'Lieutenant', 'Sergeant', 'Soldier']
  }
})
export default Stormtrooper