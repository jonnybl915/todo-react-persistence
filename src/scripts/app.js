const ReactDOM = require('react-dom');
const React = require('react');
const Backbone = require('backbone');
const {toDoModel, toDoCollection} = require('./models.js')




const HomeView = React.createClass({

  getInitialState: function(){

    let startingStateObject = {
       isSomethingGreat: false,
       toDoData : this.props.toDoDataColl
    }

    return startingStateObject;
 },

 componentWillMount: function() {
   let self = this;
   Backbone.Events.on('new-todo', function(){

     let newToDoColl = new toDoCollection();
     newToDoColl.fetch().then(function(){
       self.setState(toDoData: newToDoColl)

     })

   })

 },

 _removeToDoItemFromState: function(item){
    let self = this;
   let targetItem = item.target.parentNode.parentNode.parentNode;
   console.log("Target model :", targetItem);
   let copyOfToDoListDataToDeleteFrom = this.state.toDoData.filter(function(itm){

   let idOfItemToDestroy = itm.cid;
   console.log("id of item to destroy: ", idOfItemToDestroy);
   if (targetItem.id === idOfItemToDestroy) {
     itm.destroy();
     console.log("DDestroyeDD");
   }

   return targetItem.id !== itm.cid;
})

   let newState = {toDoData : copyOfToDoListDataToDeleteFrom}
   self.setState(newState)
},

handleKeyPress: function(target){

  if(target.charCode===13){
    target.preventDefault();
    this._addToDoItem();

  }

},

 _addToDoItem: function(e){
   console.log("add button clicked!!!");


      let theToDoText = this.refs.todoData.value
      let isDone = false
      let isHighPriority = false

      let modAttributes = {
        toDoText: theToDoText,
        isDone: isDone,
        isHighPriority: isHighPriority,
      }
      let newToDoMod = new toDoModel();
      newToDoMod.set(modAttributes);

      newToDoMod.save().then(function(serverRes){
       console.log('new-model-in-db: ', newToDoMod)
       Backbone.Events.trigger('new-todo')
     })

      let copyOfToDoListData = this.state.toDoData.map(function(m){ return m })
      copyOfToDoListData.push(newToDoMod);

      let newState = {toDoData : copyOfToDoListData}
      this.setState(newState)

      this.refs.todoData.value = "";


 },

render: function(){
    let self = this;
    return  (

          <div className="todo-container valign">
             <form className="col s12" id="todo-form-container">
               <h3>My Todos</h3>

               <div className="row input-row">

                  <div className="input-field col s11">
                    <input placeholder="What Is There ToDo..." id="first_name" onKeyPress={this.handleKeyPress} type="text" ref="todoData" className="validate todo-input"></input>


                    <label className="todo-input" ></label>
                  </div>
                  <div className="add-button">
                   <a className="btn-floating btn-med waves-effect waves-light red" onClick={this._addToDoItem}><i className="material-icons">add</i></a>
                  </div>
                </div>
             </form>
                 <ToDoItemList todoListData={this.state.toDoData} onRemoveItem={self._removeToDoItemFromState}/>
          </div>

      )
}
})

const ToDoItemList = React.createClass({

  render: function(){

    let self = this;

    let arrayOfToDoListItems = this.props.todoListData.map(function(model){

      return (

            <li className="todo-list-item" id={model.cid} key={model.cid}>

              <input type="checkbox" id={model.cid + 1} className="todo-checkbox"/>
              <label className="todo-checkbox" htmlFor={model.cid + 1}/>

              <SingleToDoItem todoModel={model} _removeToDoItem={self.props.onRemoveItem}/>

            </li>
      )
    })

    return (
            <div>
              <ul className="ul-of-todo-items">
                {arrayOfToDoListItems}
              </ul>
            </div>
    )
  }
})

const SingleToDoItem = React.createClass({

  render: function(){
    return (

        <div className="li-div">
          <p>
          {this.props.todoModel.get('toDoText')}
          </p>

          <a className="trash-icon gly-rotate-45" onClick={this.props._removeToDoItem}>
            <i className="material-icons">delete</i>
          </a>

        </div>

    )
  }
})

let toDoCollectionInstance = new toDoCollection();
toDoCollectionInstance.fetch().then(function(){
  console.log("collection instance: ", toDoCollectionInstance);
  ReactDOM.render(<HomeView toDoDataColl={toDoCollectionInstance}/>, document.querySelector('#app-container'))
})
