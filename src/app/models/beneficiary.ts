export class Beneficiary {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public comments: string,
    public age: number,
    public phone: number,
    public approved_person: string,
    public address: string,
    public reason: string,
    public department_id: string,
    public created_at: string,
    public updated_at: string
  ) {}
}
