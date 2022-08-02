import { IOrderCountSources, ITopReorderedProducts } from "./types";

export const orderCounters = () : any => {
   
   return new Promise((resolve, reject) => {    
      setTimeout(() => {
         const orderCounts: IOrderCountSources = {
            orderCounts: {
               total: 1250,
               fromEmail: 575,
               fromDashboard: 401,
               fromDetailPage: 274
            },
            revenue: {
               total: '$1250',
               fromEmail: '$575',
               fromDashboard: '$401',
               fromDetailPage: '$274'
            },
            other: {
               avgOrderValue: '$75',
               lowestOrderValue: `$2.99`,
               highestOrderValue: '$98.99'
            }
         };
         return resolve(orderCounts);
      }, 1500)  
      
   });
};


export const topReorderedProducts = (): any => {
   return new Promise((resolve, reject) => {
      
      const reorderedProducts: ITopReorderedProducts[] = [
         {
            title: 'My test t-shirt',
            price: '$1250',
            count: 1250
         },
         {
            title: 'Cool white table lamp',
            price: '$575',
            count: 575
         },
         {
            title: 'Product 3',
            price: '$401',
            count: 401
         },
         {
            title: 'Product 4',
            price: '$274',
            count: 274
         },
         {
            title: 'Product 5',
            price: '$98.99',
            count: 98
         },
         {
            title: 'Product 6',
            price: '$28.99',
            count: 10
         }
      ];

      const t: number = reorderedProducts.map((item: any) => item.count).reduce( (previousValue:any, currentValue:any) =>  previousValue + currentValue);
      setTimeout(() => {return resolve({
         products:reorderedProducts, 
         totalReorderCounts: t
      })}, 3500)
      
   });
};