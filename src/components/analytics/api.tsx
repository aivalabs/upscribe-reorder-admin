import axios from "axios";
import { IOrderCountSources, ITopReorderedProducts, IOrderInfo, IOtherAnalyticsInfo } from "./types";

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
export const orderCounters = async (params: any): Promise<any> => {
   try {
      const { store_domain, start_date, end_date } = params || {};
      const p = new URLSearchParams();
      if (store_domain) p.append("store_domain", store_domain);
      if (start_date) p.append("start_date", start_date);
      if (end_date) p.append("end_date", end_date);

      const response = await axios({
         method: 'get',
         url: `${API_HOST}/master-admin/analytics-data?${p.toString()}`,
         headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('auth_token')}`,
         }
      })
      const data: any = response.data.data;
      const orderSummery = data.orders_summary;
      const topOrderProducts = data.top_ordered_products;

      const reorderedProducts: ITopReorderedProducts[] = topOrderProducts.map((product: any) => {
         return {
            title: product.product_title,
            price: moneyFormater(product.product_price),
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
      if (reorderedProducts.length > 0) {
         topReorderEventCount = reorderedProducts?.map((item: any) => item.count)?.reduce((previousValue: any, currentValue: any) => previousValue + currentValue);
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
   } catch (e: any) {
      return {
         error: e.message,
         orderSummery: {},
         reorderedProducts: [],
         topReorderEventCount: 0
      }
   }
};

const moneyFormater = (value: number) => {
   return value ? `$${value.toFixed(2)}` : '$0.00';
}
