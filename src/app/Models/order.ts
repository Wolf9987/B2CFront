export class Order {
    //public userId: string = "";
    public amount: string = "";
    public price: string = "";
    public buySell: string = "";
    //public roles: string[] = [];
  
    constructor( amount: string, price: string, buySell: string) {
      
      this.amount = amount;
      this.price = price;
      this.buySell = buySell;
      
    }
  }