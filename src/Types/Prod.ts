
export interface IProd {
   id: number,
   title: string,
   category: string,
   price: GLfloat,
   image: string,
   description: string,
   rating:IRate,
}

interface IRate{
   rate: string,
   count: number,
}

export interface IProductState {
  items: IProd[];
  loading: boolean;
  error: Error | null;
}




