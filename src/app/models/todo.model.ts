import { Project } from "./project.model";
import { TodoPriority } from "./todo.priority.enum";

export class Todo {

  // Project project;
  project : Project;
  priority : TodoPriority;

  constructor(
    public name: String,
    public isDone: boolean,
    public dueDate: Date,
    public description: String,
    public isUpdated : boolean  // field-ul acesta il folosim doar ca sa putem transfera informatia
      // despre update din componenta todo-list catre dialog 'new-todo-dialog' fara sa modificam 
      // tipul parametrului injectat in constructor
  ) {

  }

  
}
