const Backbone = require('backbone');

const toDoModel = Backbone.Model.extend({
   url: '/api/todos/',
   idAttribute: "_id",
})

const toDoCollection = Backbone.Collection.extend({
   model: toDoModel,
   url: "/api/todos"
})

module.exports = {
   toDoModel,
   toDoCollection
}
