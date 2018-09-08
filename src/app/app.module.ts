import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import { FormsModule } from '../../node_modules/@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TodoService } from './services/todo.service';

import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Route } from '@angular/router';
import { NewTodoDialogComponent } from './dialogs/new-todo-dialog.component';
import { TodoComponent } from './components/todo.component';
import { TodoListComponent } from './components/todo-list.component';
import { HttpModule } from '@angular/http';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectService } from './services/project.service';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { TodoReusableListComponent } from './components/todo-reusable-list/todo-reusable-list.component';



const routes: Array<Route> = [
  { path : 'projects', component: ProjectListComponent, 
children : [
  { path : 'details/:projectName', component : ProjectDetailsComponent}
]},
  { path: 'todo/:id', component: TodoComponent },
  { path: 'todo', component: TodoListComponent },
  { path: '**', redirectTo: 'todo' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewTodoDialogComponent,
    TodoComponent,
    TodoListComponent,
    ProjectListComponent,
    NewProjectDialogComponent,
    ProjectDetailsComponent,
    TodoReusableListComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    // MatFormField,
    MatListModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TodoService, ProjectService],
  bootstrap: [AppComponent],
  entryComponents: [
    NewTodoDialogComponent, NewProjectDialogComponent
  ]
})
export class AppModule { }
