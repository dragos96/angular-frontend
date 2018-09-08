import { Component } from '../../../node_modules/@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Todo } from '../models/todo.model';
import { TodoremService } from '../services/todorem.service';

@Component({
  templateUrl: './todo.component.html',
})
export class TodoComponent {

  private id: number;
  private todo: Todo;
  constructor(private todosService: TodoService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((map) => {
      console.log(map);
      this.id = parseInt(map.get('id'));
      this.todo = this.todosService.getTodos()[this.id];
    });
  }
}
