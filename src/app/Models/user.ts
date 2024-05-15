export class User {
    //public userId: string = "";
    public fullName: string = "";
    public email: string = "";
    public userName: string = "";
    //public roles: string[] = [];
  
    constructor( fullName: string, email: string, userName: string) {
      
      this.fullName = fullName;
      this.email = email;
      this.userName = userName;
      
    }
  }