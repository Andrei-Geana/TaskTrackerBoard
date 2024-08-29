import { Component } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
    selector: 'app-tasks-view',
    standalone: true,
    templateUrl: './tasks-view.component.html',
    styleUrl: './tasks-view.component.scss',
    imports: [TaskGridComponent, TaskListComponent, MatIconModule, CommonModule, RouterModule, TaskCardComponent],
    providers: []
})
export class TasksViewComponent {
  isList: boolean;
  
  constructor(){
  }

  ngOnInit(){
  }

  switchMode(option:boolean){
    this.isList=option;
  }
}
