import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TodoremService {
  public getTodos() {
    return this._http.get('http://localhost:3000/todos');
    // const val = localStorage.getItem('todos');
    // let tasks = JSON.parse(val);
    // if (tasks === null) {
    //   tasks = new Array<Todo>();
    // }
    // return tasks;
  }

  public saveTodo(  newTodos : Todo ) {
    // localStorage.setItem('todos', JSON.stringify(newTodos));
    this._http.post('http://localhost:3000/todos', newTodos);
  }
  public saveTodos(newTodos : Array<Todo>){
    // saveTodo
  }
  
  constructor(private _http : Http) { }
}
