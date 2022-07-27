import { IOrderCountSources, ITopReorderedProducts } from "./types";

export const orderCounters = (): any => {
   return new Promise((resolve, reject) => {
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
   });
};


export const topReorderedProducts = (): any => {
   return new Promise((resolve, reject) => {
      const reorderedProducts: ITopReorderedProducts[] = [
         {
            title: 'Product 1',
            price: '$1250',
            count: 1250
         },
         {
            title: 'Product 2',
            price: '$575',
            count: 575
         },
         {
            title: 'Product 3',
            price: '$401',
            count: 401
         }
      ];
      return resolve(reorderedProducts);
   });
};