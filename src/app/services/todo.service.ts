import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import * as _ from 'underscore';

@Injectable()
export class TodoService {

  /**
   * 
   * @param todoEdit has to be of type Todo
   */
  updateTodo(todoEdit: any) {
    console.log('should update todo in local storage: ');
    console.log(todoEdit);
    // TODO: din localStorage trebuie sa updatam un todo cu datele lui 'todoEdit'
    let todos = JSON.parse(localStorage.getItem('todos'));

    for (let i = 0; i < todos.length; i++) {
      let todoDinDb = todos[i];
      console.log(todoDinDb);


      if (_.isEqual(todoDinDb, todoEdit.initialForm)) {
        console.log('found: ');
        console.log(todoDinDb);
        delete todoEdit.initialForm;
        todos.splice(i, 1, todoEdit);
        break;
      }
    }
    console.log('all todos:');
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  public getTodos(): Array<Todo> {
    const val = localStorage.getItem('todos');
    let tasks = JSON.parse(val);
    if (tasks === null) {
      tasks = new Array<Todo>();
    }
    return tasks;
  }

  public getTodosForProject(projectName : string): Array<Todo> {
    const val = localStorage.getItem('todos');
    let tasks = JSON.parse(val);
    if (tasks === null) {
      tasks = new Array<Todo>();
      return tasks;
    }else{
      let tasksForProject = new Array<Todo>();
      for(let task of tasks){
        if(task.project && task.project.name == projectName){
          tasksForProject.push(task);
        }
      }
      return tasksForProject;
    }
   
  }

  /**
   * This method overrides the existing 'todos' key in the local storage
   */
  public saveTodos(newTodos: Array<Todo>) {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }


  
  /**
   * Method which appends one new additional <code>Todo</code> instance to the
   * already existing todos
   * @param newTodo 
   */
  public saveTodo(newTodo: Todo) {
    let alreadyExistingTodos = JSON.parse(localStorage.getItem('todos'));
    // TODO: check if alreadyExistingTodos is undefined or null
    
    alreadyExistingTodos.push(newTodo);
    
    localStorage.setItem('todos', JSON.stringify(alreadyExistingTodos));  // replaces the 'old' todos key in local storage with new elements (appended)
  }

}
