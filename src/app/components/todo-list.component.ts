import { Component, OnInit } from '../../../node_modules/@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { MatDialog } from '../../../node_modules/@angular/material';
import { NewTodoDialogComponent } from '../dialogs/new-todo-dialog.component';
import { ProjectService } from '../services/project.service';
import { UtilityService } from '../services/utility.service';
import { TodoPriority } from '../models/todo.priority.enum';
import { DateutilService } from '../services/dateutil.service';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  title = 'app';
  newTaskName = '';
  tasks: Array<Todo> = [];
  filterCriteria : string[] = ['ALL','OVERDUE', 'TODAY', 'FUTURE'];
  selectedValue : string;
  priorityTypes : any[] = [];
  DEBUG_COMPONENT : boolean = false;

  constructor(
    private todoService: TodoService,     
    private matDialog: MatDialog, 
    private projectService :ProjectService,
    private utilityService : UtilityService,
    private dateUtilService : DateutilService) {}

  ngOnInit() {
    this.tasks = this.todoService.getTodos();


    
    this.priorityTypes.push({ value: 'NONE', title: 'NONE' });
    for(let element of  this.utilityService.enumSelector(TodoPriority)){
      this.priorityTypes.push(element);
    }

    this.priorityTypes.push({ value: 'ALL', title: 'ALL' });
    
 
  }

  

  // save new todo dialog
  onPush() {
    console.log(this.tasks);
    this.matDialog.open(NewTodoDialogComponent, {
      width: '300px',
      data: new Todo('', false, new Date(), '', false)
    }).afterClosed().subscribe((result: Todo) => {
      console.log(result);
      if (result && result.name !== '') {
        this.tasks.push(result);
        this.todoService.saveTodos(this.tasks);
      }else{
        alert('Could not save new todo');
      }
    });

    

  }

  saveTodos() {
    this.todoService.saveTodos(this.tasks);
    console.log('checkbox was updated');
  }
  deleteTodo(taskToRemove: Todo) {
    this.tasks = this.tasks.filter((task) => task !== taskToRemove );
    this.saveTodos();
  }



  shouldShowFilter(todo : Todo, optionFilterTime : string = null, optionFilterPriority : string = null){
    let shouldShowForFirstFilter : boolean =  (!optionFilterTime) || (optionFilterTime == 'ALL') || ( optionFilterTime == this.getTodoDateStatus(todo));
    let shouldShowForSecondFilter : boolean  = 
      (!optionFilterPriority) || 
       (optionFilterPriority == 'ALL') || 
       (todo.priority && optionFilterPriority == todo.priority.toString()) || 
       (optionFilterPriority == 'NONE' && !todo.priority);
    return shouldShowForFirstFilter && shouldShowForSecondFilter;
  }

  editTodo(taskToEdit: Todo){


    console.log(taskToEdit);

    let clone = Object.assign({}, taskToEdit);
    clone.isUpdated = true;
    this.matDialog.open(NewTodoDialogComponent, {
      width: '300px',
      data: clone
    }).afterClosed().subscribe((result: any) => {
      console.log(result);
      console.log(taskToEdit);
      
      if (result && result.name !== '') {
        console.log('ok');
        result.initialForm = taskToEdit;
        result.isUpdated = false;
        this.todoService.updateTodo(result);
        this.tasks = this.todoService.getTodos();
      }
    });
  }
  

 

  isTodoOverDue(todo: Todo) {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();

    let cmpResult = this.dateUtilService.dateCompare(dueDate, today);
    return cmpResult < 0;

  
  }

  isTodoToday(todo: Todo){
    const dueDate = new Date(todo.dueDate);
    const today = new Date();

    let cmpResult = this.dateUtilService.dateCompare(dueDate, today);
    return cmpResult == 0;


  }

  isTodoFuture(todo: Todo){
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    let cmpResult = this.dateUtilService.dateCompare(dueDate, today);
    return cmpResult > 0;
  }

  getTodoDateStatus(todo: Todo) : string{
    if(this.isTodoOverDue(todo)){
      return "OVERDUE";
    }
    if(this.isTodoFuture(todo)){
      return "FUTURE";
    }
    if(this.isTodoToday(todo)){
      return "TODAY";
    }
    return "UNDEFINED";

  }
}
