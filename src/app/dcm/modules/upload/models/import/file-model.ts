
export class FileModel
{
  name: string
  id: string
  color: typeColor
  checked: boolean
  sheet?: FileModel[] = []

  constructor( name: string, id: string, color: typeColor, checked: boolean, sheet?: FileModel )
  {
    this.name = name
    this.id = id
    this.color = color
    this.checked = checked
    if (sheet && sheet !== undefined) {
        this.sheet.push(sheet)
    }
  }

  addSheet(f: FileModel)
    {
        if (f && f !== undefined)
        {
            this.sheet.push(f);
        }
    }
    unCheckSheet()
    {
        this.checked = false;
    }
    checkSheet(check)
    {
        this.checked = check;
    }
}

export type typeColor = 'primary' | 'accent' | 'warn'
