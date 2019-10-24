export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: string,
    public phone: string,
    public activation: number,
    public department_id: number,
    public created_at: string,
    public updated_at: string
  ) {}
}
