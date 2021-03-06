import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { UniFilter } from './../../../models/filter';
import { UniFilterItem } from './../../../models/filter-item';

@Component({
    selector: 'uni-filters-list',
    templateUrl: './filters-list.component.html',
    styleUrls: ['./filters-list.component.scss']
})
export class UniFiltersListComponent implements OnInit {

    @HostBinding('class.uni-filters-list') componentClass = true;

    @Input() mainTitle: string;
    @Input() mainFilters: UniFilterItem[];

    @Input() customTitle: string;
    @Input() customFilters: UniFilterItem[];
    @Output() customFiltersChange: EventEmitter<UniFilterItem[]> = new EventEmitter();

    @Input() filterSelected: UniFilter;
    @Output() filterSelectedChange: EventEmitter<UniFilter> = new EventEmitter();

    get isEmpty() {
        return (!this.mainFilters || this.mainFilters.length === 0) &&
            (!this.customFilters || this.customFilters.length === 0);
    }
    constructor() { }
    ngOnInit() { }

    onFilterSelected(filterItem: UniFilterItem) {
        this.filterSelected = filterItem;
        this.filterSelectedChange.emit(filterItem);
    }
    addCustomFilter(filterItem: UniFilterItem) {
        this.customFilters = this.customFilters || [];
        this.customFilters = [...this.customFilters, filterItem];
        this.customFiltersChange.emit(this.customFilters);
    }
}
