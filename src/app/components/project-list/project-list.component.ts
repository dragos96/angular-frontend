import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material';
import { NewProjectDialogComponent } from '../../dialogs/new-project-dialog.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects : Array<Project> = [];
  selectedProject : Project;
  todosForSelectedProject : Array<Todo> = [];

  constructor(private projectService : ProjectService, private matDialog: MatDialog,
  private todoService : TodoService) { }

  ngOnInit() {
    this.projects = this.projectService.findAll();
  }


  selectProject(proj : Project){
    console.log('we have selected the project: ');
    console.log(proj);
    // this.tasksForProject = this.todoService.getTodosForProject(this.projectName);
    this.selectedProject = proj;
    this.todosForSelectedProject = this.todoService.getTodosForProject(this.selectedProject.name);
  }

  addProject(){
    console.log('adding project');
    this.matDialog.open(NewProjectDialogComponent, {
      width: '300px',
      data: new Project('')
    }).afterClosed().subscribe((result: Project) => {
      console.log(result);
      if (result && result.name !== '') {
        this.projects.push(result);
        this.projectService.save(this.projects);
      }
    });
  }

}
