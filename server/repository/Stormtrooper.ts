import mongoose from "../config/mongoose";
import schema from "../schema/Stormtrooper";

const model = mongoose.model("Stormtrooper", schema);

const Stormtrooper = {
  list(q: string, page: any = 1) {
    let query = {};
    if (q) query = { name: new RegExp(q, "i") };
    const DEFAULT_LIMIT = 3;
    const skip = Math.abs(page - 1) * DEFAULT_LIMIT;

    return model.find(query, {}, { skip, limit: DEFAULT_LIMIT });
  },
  byId(id: string) {
    return model.findOne({ _id: id })
  },
  create(data: object) {
    const trooper = new model(data);
    return trooper.save();
  },
  updateById(id: string, data: object) {
    return model.updateOne({ _id: id }, data);
  },
  deleteById(id: string) {
    return model.deleteOne({ _id: id });
  },
};
export default Stormtrooper;
