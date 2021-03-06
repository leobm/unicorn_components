import { Component, ElementRef, EventEmitter, Inject, Output, HostBinding } from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'uni-tooltip',
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.component.scss'],
})
export class UniTooltipComponent {

    options:any = {};
    message = '';

    @HostBinding('class.uni-tooltip') componentClass = true;
    @Output() accept = new EventEmitter();

    constructor(
        private elementRef: ElementRef,
        @Inject(DOCUMENT) private document: any
    ) { }

    setOptions(options:any) {
        if ((options.left || options.right) && (options.top || options.bottom)) {
            return this.options = options;
        }
        if (options.element && options.orientation) {
            return this.options = this.calculatePosition(options.element, options.orientation);
        }
    }

    setMessage(msg) {
        this.message = msg;
    }

    private calculatePosition(
        el: HTMLElement,
        orient: 'left' | 'right' | 'bottom' | 'top',
        cont: HTMLElement = this.document
    ): any {
        if (!el.getBoundingClientRect) { return {}; }

        const rect = el.getBoundingClientRect();

        switch (orient) {
            case 'right': return { left: rect.right + 10, top: rect.top };
            case 'bottom': return { left: rect.left, top: rect.bottom + 10 };
            case 'left': return { left: rect.left - 225 - 10, top: rect.top };
            default: return {};
        }
    }
}
