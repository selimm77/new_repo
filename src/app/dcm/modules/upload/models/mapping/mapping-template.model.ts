export class MappingTemplate {
  id: number;
  name: string;
  user: string;
  lastUsedDate: Date;
  template: boolean;

  constructor(id, name, user, lastUsedDate, fieldMapping, template?) {
    this.id = id;
    this.name = name;
    this.user = user;
    this.lastUsedDate = lastUsedDate;

    this.template = template
  }
}

export class MappingTemplateViewModel extends MappingTemplate {
  selected: boolean;

  constructor(id, name, user, lastUsedDate, template?) {
    super(id, name, user, lastUsedDate, template)
  }
}
