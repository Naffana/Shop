

export interface IUser{
   name:IName,
   address: IAddress,
   login:ILog,
   number: INumber,
   cart: ICart,
}
interface ICart{
   id:number,
   summa:number,
   quantity:number,
   title:string,
   image:string,
   price:GLfloat;
}

interface INumber{
   countryСode: string,
   number:number,
}

interface IName{
   firstName: string,
   lastName: string,
}

interface IAddress{
   city: string,
   street: string,
   home: string,
   zipcode: string,
}

 interface ILog{ 
   email:string,
   userName: string,
   password: string,
}


export interface IUserState {
  error:string | null,
  User: IUser,
  cart:ICart[],
//Like:IProd[];
}


export interface IAuthState {
   user: null | object,
   error: string | null,
   isAuthenticated: boolean,
 }