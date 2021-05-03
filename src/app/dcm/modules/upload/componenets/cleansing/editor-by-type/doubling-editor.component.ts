import {
    AfterViewInit,
    Component,
    ViewChild,
    ViewContainerRef,
  } from '@angular/core';
  import { AgEditorComponent } from '@ag-grid-community/angular';
  
  @Component({
    selector: 'editor-cell',
    template: `<input
      type="number"
      [(ngModel)]="value"
      #input
      style="width: 100%"
    />`,
  })
  export class DoublingEditor implements AgEditorComponent, AfterViewInit {
    private params: any;
    private value: any;
  
    @ViewChild('input', { read: ViewContainerRef })
    public input: ViewContainerRef;
  
    ngAfterViewInit() {
      // focus on the input
      setTimeout(() => this.input.element.nativeElement.focus());
    }
  
    agInit(params: any): void {
      this.params = params;
  
      this.value = parseFloat(this.params.value);
    }
  
    /* Component Editor Lifecycle methods */
    // the final value to send to the grid, on completion of editing
    getValue() {
      // this simple editor doubles any value entered into the input
      return this.value;
      // return this.value * 2;
    }
  
    // Gets called once before editing starts, to give editor a chance to
    // cancel the editing before it even starts.
    isCancelBeforeStart() {
      return false;
    }
  
    // Gets called once when editing is finished (eg if enter is pressed).
    // If you return true, then the result of the edit will be ignored.
    isCancelAfterEnd() {
      // our editor will reject any value greater than 1000000000000
      return this.value > 1000000000000;
    }
  }
  