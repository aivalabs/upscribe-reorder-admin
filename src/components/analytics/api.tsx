import axios from "axios";
import { IOrderCountSources, ITopReorderedProducts, IOrderInfo,IOtherAnalyticsInfo } from "./types";

export const orderCounters = async (params: any): Promise<any> => {
   const { store_domain, start_date, end_date } = params || {};
   const p = new URLSearchParams();
   if(store_domain) p.append("store_domain", store_domain);
   if(start_date) p.append("start_date", start_date);
   if(end_date) p.append("end_date", end_date);

   const response = await axios({
      method: 'get',
      url: `http://localhost:3333/master-admin/analytics-data?${p.toString()}`,
      headers: {
         'Content-Type': 'application/json',
      }
   }) 
   const data: any = response.data.data;
   const orderSummery = data.orders_summary;
   const topOrderProducts = data.top_ordered_products;

   const reorderedProducts: ITopReorderedProducts[] = topOrderProducts.map((product: any) => {
      return {
         title: product.product_title,
         price: product.product_price,
         count: product.order_count
      }
   });
   const accountpage: any = orderSummery.find((item: any) => item.event_source === 'accounts_dashboard')
   const orderDetail: any = orderSummery.find((item: any) => item.event_source === 'order_details')
   const email: any = orderSummery.find((item: any) => item.event_source === 'email');
   const overall: any = orderSummery.find((item: any) => item.event_source === 'all');

   const orderCounts: IOrderInfo = {
      total: overall?.event_source_count || 0,
      fromDashboard: accountpage?.event_source_count || 0,
      fromDetailPage: orderDetail?.event_source_count || 0,
      fromEmail: email?.event_source_count || 0
   }
   const revenue: IOrderInfo = {
      total: moneyFormater(overall?.total_value),
      fromDashboard: moneyFormater(accountpage?.total_value),
      fromDetailPage: moneyFormater(orderDetail?.total_value),
      fromEmail: moneyFormater(email?.total_value)
   };
   const other: IOtherAnalyticsInfo = {
      avgOrderValue: moneyFormater(overall?.average_order_value),
      lowestOrderValue: moneyFormater(overall?.lowest_order_value),
      highestOrderValue: moneyFormater(overall?.highest_order_value)
   }
   let topReorderEventCount: number = 0
   if(reorderedProducts.length > 0) {
      topReorderEventCount = reorderedProducts?.map((item: any) => item.count)?.reduce( (previousValue:any, currentValue:any) =>  previousValue + currentValue);
   }


   
   const orderSummerys: IOrderCountSources = {
      orderCounts: orderCounts,
      revenue: revenue,
      other: other
   };
   return {
      orderSummery: orderSummerys,
      reorderedProducts,
      topReorderEventCount
   };
};

const moneyFormater = (value: number) => {
   return value? `$${value.toFixed(2)}` : '$0.00';
}

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