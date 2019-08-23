export class Authservice {
  login(email: string, pass: string) {
    alert(email + " " + pass);
  }

  register(name: string, email: string, pass: string) {
    alert(name + " " + email + " " + pass);
  }

  logout() {}

  authenticate() {}
}
