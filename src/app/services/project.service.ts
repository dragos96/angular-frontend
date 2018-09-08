import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }


  
  public findAll(): Array<Project> {
    const val = localStorage.getItem('projects');
    let projects = JSON.parse(val);
    if (projects === null) {
      projects = new Array<Project>();
    }
    return projects;
  }

  public save(newprojects: Array<Project>) {
    localStorage.setItem('projects', JSON.stringify(newprojects));
  }
}
