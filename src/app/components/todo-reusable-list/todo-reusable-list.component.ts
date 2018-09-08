import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material';
import { ProjectService } from '../../services/project.service';
import { UtilityService } from '../../services/utility.service';
import { DateutilService } from '../../services/dateutil.service';
import { TodoPriority } from '../../models/todo.priority.enum';
import { NewTodoDialogComponent } from '../../dialogs/new-todo-dialog.component';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-todo-reusable-list',
  templateUrl: './todo-reusable-list.component.html',
  styleUrls: ['./todo-reusable-list.component.css']
})
export class TodoReusableListComponent implements OnInit {

  title = 'app';
  newTaskName = '';
  

  // <app-todo-reusable-list [tasks]="todosForSelectedProject"></app-todo-reusable-list>
  @Input() associatedProject : Project;
  @Input() tasks: Array<Todo> = [];
  @Output() eventul : EventEmitter<Todo> = new EventEmitter();

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

    // custom a.i. sa luam numai todo-urile selectate EXTERN 
    // this.tasks = this.todoService.getTodos(); NU MAI AVEM nevoie de linia asta, sunt populate 'ca parametru'

    // this.todosRemService.getTodos().subscribe(values => {
    //   this.tasks = values.json();
    // });
    
    this.priorityTypes.push({ value: 'NONE', title: 'NONE' });
    for(let element of  this.utilityService.enumSelector(TodoPriority)){
      this.priorityTypes.push(element);
    }
    // (let element of this.utilityService.enumSelector(TodoPriority)){

    // }
    // this.priorityTypes.push();
    this.priorityTypes.push({ value: 'ALL', title: 'ALL' });
    
    if(this.DEBUG_COMPONENT){
      this.debugTodoAdd();
    }
  }

  /* DEBUG */
  debugTodoAdd(){
    let localDebugTasks: Array<Todo> = [];

    let dataYesterday : Date = new Date();
    dataYesterday.setDate(dataYesterday.getDate() - 1);
    localDebugTasks.push(new Todo('TODO_debug_1', false, dataYesterday, '', false));
    let dataLastYear : Date = new Date();
    dataLastYear.setFullYear(dataLastYear.getFullYear() - 1);
    localDebugTasks.push(new Todo('TODO_debug_2', false, dataLastYear, '', false));

    let dataLastMonth : Date = new Date();
    dataLastMonth.setMonth(dataLastMonth.getMonth() - 1);
    localDebugTasks.push(new Todo('TODO_debug_3', false, dataLastMonth, '', false));


    this.todoService.saveTodos(localDebugTasks);
  }

  /* END DEBUG */

  // save new todo dialog
  onPush() {
    console.log(this.tasks);
    let todoModel : Todo = new Todo('', false, new Date(), '', false);
    todoModel.project = this.associatedProject;


    this.matDialog.open(NewTodoDialogComponent, {
      width: '300px',
      data: todoModel
    }).afterClosed().subscribe((result: Todo) => {
      console.log(result);
      if (result && result.name !== '' ) {
        this.tasks.push(result);
        this.todoService.saveTodo(result);  // in the case of being able to view just a segment of all 
              // todos available, we need to append the new (added) todo instead of overriding the whole 
              // local storage key
      }else{
        alert('Could not save new todo');
      }
    });

    // const newTaskObject: Todo = new Todo(this.newTaskName, false);
    // this.tasks.push(newTaskObject);
    // this.todoService.saveTodos(this.tasks);
    // this.newTaskName = '';

  }

  saveTodos() {
    this.todoService.saveTodos(this.tasks);
    console.log('checkbox was updated');
  }
  deleteTodo(taskToRemove: Todo) {
    this.tasks = this.tasks.filter((task) => task !== taskToRemove );
    this.saveTodos();
  }

  // updateTodo(taskToEdit: Todo) {
  //   // TODO: check which task from tasks array needs to be 'updated'

  //   this.saveTodos();
  // }


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

    // TODO: clone the taskToEdit object

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
        // result.info = 'descriere random';
        result.isUpdated = false;
        this.todoService.updateTodo(result);
        this.tasks = this.todoService.getTodos(); // TODO: nu trebuie sa selectam TOATE todo-urile, ci trebuie sa refresh-uim parametrii de input
      }
    });
  }
  

 

  isTodoOverDue(todo: Todo) {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();

    let cmpResult = this.dateUtilService.dateCompare(dueDate, today);
    return cmpResult < 0;

    // if(dueDate.getFullYear() > today.getFullYear()){
    //   return false;
    // }

    // if(dueDate.getFullYear() < today.getFullYear()){
    //   return true;
    // }

    // // same year
    // if(dueDate.getMonth() > today.getMonth()){
    //   return false;
    // }

    // if(dueDate.getMonth() < today.getMonth()){
    //   return true;
    // }
    // // same month

    // return dueDate.getDate() - today.getDate() < 0;

  
  }

  isTodoToday(todo: Todo){
    const dueDate = new Date(todo.dueDate);
    const today = new Date();

    let cmpResult = this.dateUtilService.dateCompare(dueDate, today);
    return cmpResult == 0;


    // return dueDate.getFullYear() == today.getFullYear() &&
    //   dueDate.getMonth() == today.getMonth() &&
    //   dueDate.getDate() == today.getDate();
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
