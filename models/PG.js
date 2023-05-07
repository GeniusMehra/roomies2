import mongoose, { mongo } from "mongoose";

const PgSchema = new mongoose.Schema({
  owner: {
   type:String,
   required:true
  },
  pgname:{
    type:String,
    required:true
  },
  location: {
    type: String,
    required: true,
  },
  manager: {
    type: String
  },
  rooms: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Room"
    }
  ],
  name:{
    type:String,
    required:true
  }
});

export const PG = mongoose.model("PG", PgSchema);
