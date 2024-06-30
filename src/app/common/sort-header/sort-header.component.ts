import { Component, HostListener, Input } from "@angular/core";
import { Sorter } from "./sorter.directive";

@Component({
  selector: "[sortHeader]",
  template: `
    <div class="sort-col">
      <ng-content></ng-content>
      <div
        [ngClass]="{
          arrow: true,
          hide: sorter.active !== ref || sorter.direction === '',
          asc: sorter.active === ref && sorter.direction === 'asc',
          desc: sorter.active === ref && sorter.direction === 'desc'
        }"
      >
        &nbsp;🡡&nbsp;
      </div>
    </div>
  `,
  styles: [
    `
      .sort-col {
        display: flex;
        align-items: center;
      }
      .arrow {
        font-size: 14px;
      }
      .arrow.hide {
        opacity: 0;
      }
      .arrow.desc {
        transform: rotate(180deg);
      }
      th[sortheader] {
        cursor: pointer;
      }
    `,
  ],
})
export class SortHeader {
  @Input()
  ref!: string;

  @HostListener("click")
  sort() {
    this.sorter.sort(this.ref);
  }

  constructor(public sorter: Sorter) {}
}
