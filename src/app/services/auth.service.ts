export class AuthService {

  isAuth = false;
  isAdmin = false;

signIn() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(
        () => {
          this.isAuth = true;
          this.isAdmin = false;
          resolve(true);
        }, 0
      );
    }
  );
}

signInAdmin() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(
        () => {
          this.isAuth = true;
          this.isAdmin = true;
          resolve(true);
        }, 0
      );
    }
  );
}

signOut(){
  this.isAuth = false;
  this.isAdmin = false;
}
}
