import { useEffect, useState } from "react";
import { useAnalytics, useUtility } from "../../store";
import { getStores, orderCounters } from "./api";
import { Loader } from "./loader";
import CardSection from "./sections/card-section";
import Other from "./sections/other";
import PageTitle from "../common/snippets/page-title";
import AnalyticsFilter from "./snippents/analytics-filter";
import moment from "moment";

const currentDate = new Date();

export default function Analytics() {
   const {
      orderCountSources: { orderCounts, revenue, other },
      setIOrderCountSources,
      topReorderedProducts,
      setTopReorderedProducts,
      totalReorderCounts,
      setTotalReorderCounts } = useAnalytics();

   const { isLoading, setIsLoading } = useUtility();

   const [initialAnalyticsData, setInitialAnalyticsData] = useState({
      store_domain: '',
      start_date: moment(currentDate).subtract(1, 'M').format('YYYY-MM-DD'),
      end_date: moment(currentDate).format('YYYY-MM-DD')
   });
   const [stores, setStores] = useState([]);

   useEffect((): any => {
      (async () => {
         let analytics_data = initialAnalyticsData;
         await getStores()
            .then((data: any) => {
               analytics_data.store_domain = data[0].domain;
               setInitialAnalyticsData(analytics_data);
               setStores(data);
            });
         setIsLoading(true);
         await orderCounters(analytics_data)
            .then((data: any) => {
               setIOrderCountSources(data.orderSummery);
               setTopReorderedProducts(data.reorderedProducts);
               setTotalReorderCounts(data.topReorderEventCount);
               setIsLoading(false);

            })
            .catch((err: Error) => {
               console.log(err)
               setIsLoading(false);
            });
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <>
         {initialAnalyticsData.store_domain && stores.length > 0 ? (<>
            <PageTitle title="Analytics" element={<AnalyticsFilter initialAnalyticsData={initialAnalyticsData} stores={stores} />} />
            {
               isLoading ?
                  <div className="m-3"><Loader /></div>
                  :
                  <>
                     <div className="row mt-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-8"></div>
                     </div>
                     <CardSection title="Number of Orders" card={orderCounts} />
                     <CardSection title="Total Revenue Generated" card={revenue} />
                     <Other title="Others" other={other} topReorderedProducts={topReorderedProducts} totalReorderCounts={totalReorderCounts} />
                  </>
            }
         </>) : <>No Stores Found</>}
      </>
   );
}