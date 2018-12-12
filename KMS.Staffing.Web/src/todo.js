import React, { Component} from "react";

class Task extends Component {

    constructor(props) {
        super(props);

        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleStatusChange(e)
    {
        this.props.onStatusChange(e.target.value, e.target.checked);
    }

    render() {      
  
      const rows = [];
      const task = this.props.task;
  
      return (
        <div>
          <span><input type='checkbox' value={task.id} defaultChecked={task.completed} onChange={this.handleStatusChange}/> </span>
          <span>{task.name}</span>
        </div>
      );
    }
  }

class TaskList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      
      const rows = [];   
      //0: all; 1: active; 2: completed 
      const showType = this.props.showType;      
  
      this.props.tasks.forEach((task) => {
        
          if(showType == 0)
          {            
            rows.push(<Task key={task.id} task={task} onStatusChange={this.props.onTaskStateChange} />);            
          }
          else if(showType == 1 && task.completed === false)
          {            
            rows.push(<Task key={task.id} task={task} onStatusChange={this.props.onTaskStateChange} />);            
          }
          else if (showType == 2 && task.completed === true)
          {
            rows.push(<Task key={task.id} task={task} onStatusChange={this.props.onTaskStateChange} />);            
          }            

      });
  
      return (
        <div>
          {rows}
        </div>
      );
    }
  }

class TaskInput extends Component {
    constructor(props) {
      super(props);

      this.state = {
          taskName : this.props.taskName
      };

      this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    handleTaskNameChange(e) {
      this.setState({"taskName" : e.target.value});
    }

    handleSubmit(e)
    {
      this.props.onAddTask(this.state.taskName);     
      this.resetInput();

      e.preventDefault();
    }

    resetInput()
    {
        this.setState({taskName : ''});
    }
        
    render() {
      return (
        <form onSubmit={this.handleSubmit}> 
          <input
            type="text"
            placeholder="Todo..."
            value={this.state.taskName}
            onChange={this.handleTaskNameChange}
          />          
        </form>
      );
    }
  }

  class TaskCommand extends Component {
    constructor(props) {
      super(props);

      this.handleShowType = this.handleShowType.bind(this);
    }

    handleShowType(type)
    {        
        this.props.onShowTypeChange(type);
    }    
  
    render() {
      return (
        <div>
          <span>{this.props.tasks.length} items left</span> 
          &nbsp;|&nbsp; 
          <span><a href='#' onClick={() => this.handleShowType(0)}>All</a></span> 
          &nbsp;|&nbsp;
          <span><a href='#' onClick={() => this.handleShowType(1)}>Active</a></span>
          &nbsp;|&nbsp;
          <span><a href='#' onClick={() => this.handleShowType(2)}>Completed</a></span>          
        </div>
      );
    }
  }

class TodoList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        taskName: '',
        showType: 0,
        tasks : this.props.tasks
      };
      
      this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
      this.handleAddTask = this.handleAddTask.bind(this);
      this.handleShowType = this.handleShowType.bind(this);
      this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
    }
  
    handleTaskNameChange(taskName) {
      
    }

    handleAddTask(taskName) {
        const tasks = this.state.tasks;
        tasks.push({id : tasks.length + 1, name : taskName, completed:false});

        this.setState({
            tasks: tasks
        });
    }

    handleShowType(type) {        
        this.setState({showType : type});
    }

    handleTaskStatusChange(id, completed)
    {
        const tasks = this.state.tasks;
        const index = tasks.findIndex((e) => e.id == id);

        if(index != -1)
        {
            tasks[index].completed = completed;
        }

        this.setState({tasks : tasks});        
    }    
  
    render() {
      return (
        <div>
          <TaskInput
            taskName={this.state.taskName}            
            onTaskNameChange={this.handleTaskNameChange}  
            onAddTask= {this.handleAddTask}      
          />

          <TaskList
            tasks={this.state.tasks}    
            showType={this.state.showType}  
            onTaskStateChange = {this.handleTaskStatusChange}      
          />

          <TaskCommand
            tasks={this.state.tasks}  
            onShowTypeChange = {this.handleShowType}          
          />          
        </div>
      );
    }
  }


export default TodoList;