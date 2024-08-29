import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, NgClass, NgIf],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task;
  @Output() deleteTaskEventEmitter = new EventEmitter<Task>();
  @Output() editTaskEventEmitter = new EventEmitter<Task>();

  constructor(){}

  editTask() {
    this.editTaskEventEmitter.emit(this.task);
  }

  deleteTask() {
    this.deleteTaskEventEmitter.emit(this.task);
  }
}
