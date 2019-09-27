import { Identifiers } from "@angular/compiler";

export class Department {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public created_at: string,
    public updated_at: string
  ) {}
}
