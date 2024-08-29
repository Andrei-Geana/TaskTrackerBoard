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
  status:string;
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
  
  selectStatus(status: Status) {
    this.status = status;
    this.statusSelected.emit(status);
  }
  
  statuses = Object.values(Status);

  constructor() {}

  ngOnInit(): void {}

  isSelected(status: string): boolean {
    return this.status === status;
  }
}
