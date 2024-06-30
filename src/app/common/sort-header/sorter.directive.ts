import { Directive, EventEmitter, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
export class SortEvent {
  field!: string;
  direction!: SortDirection;
}

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

@Directive({
  selector: '[sorter]',
})
export class Sorter {
  active: string = '';
  direction: SortDirection = '';
  @Output() sortChange = new EventEmitter<SortEvent>();

  sort(column: string) {
    if (this.active !== column) {
      this.active = column;
      this.direction = '';
    }

    this.direction = rotate[this.direction];
    this.sortChange.emit({ direction: this.direction, field: column });
  }
}
