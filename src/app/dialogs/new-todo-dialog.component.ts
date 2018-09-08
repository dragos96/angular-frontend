import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Todo } from '../models/todo.model';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { UtilityService } from '../services/utility.service';
import { TodoPriority } from '../models/todo.priority.enum';

@Component({
  templateUrl: './new-todo-dialog.component.html'
})
export class NewTodoDialogComponent implements OnInit {


  projects: Array<Project> = [];
  priorityTypes = [];

  constructor(private dialogRef: MatDialogRef<NewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newTodo: Todo, private projectService: ProjectService,
    private utilityService: UtilityService) {
    console.log('***DIALOG INSTANTIAT***')
    console.log(newTodo);

  }

  ngOnInit(): void {
    this.priorityTypes = this.utilityService.enumSelector(TodoPriority);
    console.log('PRIORITY TYPES:');
    console.log(this.priorityTypes);
    this.projects = this.projectService.findAll();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

 
}
