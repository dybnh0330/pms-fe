import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

interface Page {
  label: string;
  value: number;
}

@Component({
  selector: "pagination",
  template: `
    <ul class="pagination mrr-0 pd-0">
      <li
        *ngIf="showFirst"
        class="page-item"
        [ngClass]="{ disabled: page === 1 }"
      >
        <a
          class="page-link border-0"
          aria-label="Previous"
          (click)="setPage(1)"
        >
          <span aria-hidden="true">«</span>
        </a>
      </li>
      <li
        *ngIf="showPrev"
        class="page-item"
        [ngClass]="{ disabled: page === 1 }"
      >
        <a
          class="page-link border-0"
          aria-label="Previous"
          (click)="setPage(page - 1)"
        >
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>
      <li
        *ngFor="let item of pagesLable"
        class="page-item"
        [ngClass]="{ active: item.value === page }"
        (click)="setPage(item.value)"
      >
        <a class="page-link border-0">{{ item.label }}</a>
      </li>
      <li
        *ngIf="showNext"
        class="page-item"
        [ngClass]="{ disabled: page === totalPages }"
      >
        <a
          class="page-link border-0"
          aria-label="Next"
          (click)="setPage(page + 1)"
        >
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
      <li
        *ngIf="showLast"
        class="page-item"
        [ngClass]="{ disabled: page === totalPages }"
      >
        <a
          class="page-link border-0"
          aria-label="Next"
          (click)="setPage(totalPages)"
        >
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  `,
  styles: [
    `
      .page-link {
        cursor: pointer;
      }
    `,
  ],
})
export class Pagination implements OnInit, OnChanges {
  @Input() totalItems: number = 100;
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() showFirst = true;
  @Input() showLast = true;
  @Input() showNext = true;
  @Input() showPrev = true;
  @Input() paginationRange: number = 5;
  @Output() onPageChange = new EventEmitter<any>();

  totalPages: number = 10;
  pagesLable: Page[] = [];
  currentPage = 1;

  ngOnInit(): void {
    this.setPage(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges", changes);

    let change = false;

    if (changes["page"] && changes["page"].currentValue) {
      this.page = changes["page"].currentValue;
      this.currentPage = this.page;
      change = true;
    }

    if (changes["totalItems"] && changes["totalItems"].currentValue) {
      this.totalItems = changes["totalItems"].currentValue;
      change = true;
    }

    if (changes["itemsPerPage"] && changes["itemsPerPage"].currentValue) {
      this.itemsPerPage = changes["itemsPerPage"].currentValue;
      if (!changes["firstChange"] && this.totalItems == 0) {
        change = false;
        this.setPage(1);
      }
      change = true;
    }

    if (change) {
      this.pagesLable = this.createPageArray();
    }
  }

  setPage(pageNumber: number) {
    this.page = pageNumber;
    this.pagesLable = this.createPageArray();
    if (this.page === this.currentPage) return;
    this.currentPage = this.page;
    this.onPageChange.emit(this.page);
  }

  private createPageArray(): Page[] {
    let pages = [];

    this.totalPages = Math.max(
      Math.ceil(this.totalItems / this.itemsPerPage),
      1
    );
    const halfWay = Math.ceil(this.paginationRange / 2);

    const isStart = this.page <= halfWay;
    const isEnd = this.totalPages - halfWay < this.page;
    const isMiddle = !isStart && !isEnd;

    let ellipsesNeeded = this.paginationRange < this.totalPages;
    let i = 1;

    while (i <= this.totalPages && i <= this.paginationRange) {
      let label;
      let pageNumber = i;
      if (i === this.paginationRange) pageNumber = this.totalPages;
      else if (ellipsesNeeded) {
        if (this.totalPages - halfWay < this.page) {
          pageNumber = this.totalPages - this.paginationRange + i;
        } else if (halfWay < this.page) {
          pageNumber = this.page - halfWay + i;
        }
      }
      let openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
      let closingEllipsesNeeded =
        i === this.paginationRange - 1 && (isMiddle || isStart);
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        label = "...";
      } else {
        label = `${pageNumber}`;
      }
      pages.push({
        label: label,
        value: pageNumber,
      });
      i++;
    }
    return pages;
  }
}
