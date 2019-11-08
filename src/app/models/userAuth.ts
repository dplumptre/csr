export class UserAuth {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public rolesSlug: string,
    public department_id: number,
    public _token: string,
    public _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
