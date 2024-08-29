import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Status } from '../status';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
  
  selectStatus(status: Status) {
    this.statusSelected.emit(status);
  }
  
  statuses = Object.values(Status);

  constructor() {}

  ngOnInit(): void {}
}
