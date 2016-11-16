const Backbone = require('backbone');

const toDoModel = Backbone.Model.extend({
   url: '/api/todo/',
   idAttribute: "_id",
})

const toDoCollection = Backbone.Collection.extend({
   model: toDoModel,
   url: "/api/todo/"
})

module.exports = {
   toDoModel,
   toDoCollection
}
