import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectName : string;
  tasksForProject : Array<Todo> = [];

  constructor(private routes : ActivatedRoute, private todoService : TodoService) { }

  ngOnInit() {
    this.routes.params.subscribe(parametri => {
      console.log('params sunt:')
      console.log(parametri);
      this.projectName = parametri.projectName;
      this.tasksForProject = this.todoService.getTodosForProject(this.projectName);
    });
  }

}
