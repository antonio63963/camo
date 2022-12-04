import path from 'path';
import mongoose from 'mongoose';
const { Schema } = mongoose;



const generalSchema = new Schema({
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  title: {
    type: Schema.Types.String,
    required: true
  },
  url: {
    type: Schema.Types.String,
    required: true
  },
},
{
  timestamps: true
});

generalSchema.set('toJSON', {virtuals: true});

const modelName = path.basename(__filename, '.ts');
const model = mongoose.model(modelName, generalSchema);
export default model;