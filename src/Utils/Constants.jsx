
export const API_URL = 'https://fakestoreapi.com';

export const defaultValues = {
   name:{
    firstName: "",
    lastName: "",
   },
   address: {
    city: "",
   street: "",
   home: "",
   zipcode: "",
   },
   number:{
    countryСode: "",
    number:0,
   },
   cart:{
    id:0,
   summa:0,
   quantity:0,
   title:'',
   image:'',
   price:0,
   },
   login: {
    email: '',
    userName: '',
    password: '',
  },
 }
// export const buildUrl = (url,params) =>{
//    let urlWithParams = url;
//    Object.entries(params).forEach(([key,value],i)=>{
//    const sign = !i ? "?":"&";
//    urlWithParams += `${sign}${key}=${value}`;
//    });
//    return urlWithParams;
// }
