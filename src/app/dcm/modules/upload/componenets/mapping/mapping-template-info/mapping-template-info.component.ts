import { MappingTemplate } from './../../../models/mapping/mapping-template.model';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'anms-mapping-template-info',
  templateUrl: './mapping-template-info.component.html',
  styleUrls: ['./mapping-template-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MappingTemplateInfoComponent {

  @Input() template: MappingTemplate

  constructor() { }
}
