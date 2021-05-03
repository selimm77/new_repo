import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'anms-customized-shared-grid',
    template: `
        <button style='height: 21px' (click)='click()' class='btn btn-info'>Click</button>
    `,
    styles: [
        `.btn {
            line-height: 0.5;
            width: 100%;
        }`
    ]
})
export class CustomizedSharedGridComponent {
    @Input() cell: any;
    @Output() clicked = new EventEmitter<boolean>();

    click(): void {
        this.clicked.emit(this.cell);
    }
}