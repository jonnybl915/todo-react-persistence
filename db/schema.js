const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const resourceSchema = new Schema({
  // example of optional fields
  title:        { type: String, required: true },
  description:  { type: String },
  upVotes:      { type: Number, default: 0 },
  createdAt:    { type: Date, default: Date.now }

})
/*
toDoText: "Take out the trash",
isDone: false,
isHighPriority: false,
*/
const toDoSchema = new Schema({

  toDoText:       { type: String, required: true },
  isDone:         {type: Boolean, default: false },
  isHighPriority: {type: Boolean, default: false},
  createdAt:      { type: Date, default: Date.now }

})



module.exports = {
   /*
    * NOTE: you would ideally change the export-value and the model-name
    */
  Resource: createModel('Resource', resourceSchema),
  ToDo: createModel('ToDo', toDoSchema)
}
