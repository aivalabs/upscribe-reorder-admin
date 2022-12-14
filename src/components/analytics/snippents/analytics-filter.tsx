import { useRef, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";


import ADateRangePicker from "./date-range-picker";
import { useAnalytics, useUtility } from "../../../store";
import { orderCounters } from "../api";

export default function AnalyticsFilter(props: any) {
   const { initialAnalyticsData, stores } = props;
   const {
      setIOrderCountSources,
      setTopReorderedProducts,
      setTotalReorderCounts
   } = useAnalytics();

   const { setIsLoading } = useUtility();

   const [open, setOpen] = useState(false);
   const [startDate, setStartDate] = useState(initialAnalyticsData.start_date);
   const [endDate, setEndDate] = useState(initialAnalyticsData.end_date);
   const [dateRange, setDateRange] = useState(startDate + ' to ' + endDate);
   const [currentStore, setCurrentStore] = useState(initialAnalyticsData.store_domain);

   const datePickerToggleRef = useRef(null);

   const history = useHistory();

   const handleFilter = (e: any) => {
      e.preventDefault();
      setIsLoading(true);
      orderCounters({ store_domain: currentStore, start_date: startDate, end_date: endDate })
         .then((data: any) => {
            setIOrderCountSources(data.orderSummery);
            setTopReorderedProducts(data.reorderedProducts);
            setTotalReorderCounts(data.topReorderEventCount);
            setIsLoading(false);
            // history.push(`/master-admin/analytics-data?store_domain=${currentStore}&start_date=${startDate}&end_date=${endDate}`);
         })
         .catch((err: Error) => console.log(err));
   }

   return (
      <>
         <form
            onSubmit={handleFilter}
            className="row row-cols-lg-auto g-3 align-items-center justify-content-end"
            style={{ position: 'relative', width: '100%' }}>
            <div className="col-12 col-md-5">
               <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
               <select className="form-select" id="inlineFormSelectPref" name="store_domain" onChange={(e) => {
                  setCurrentStore(e.target.value);
               }}>
                  {stores.map((store: any) => (<option key={store.domain} value={store.domain}>{store.name}</option>))}
               </select>
            </div>

            <div className="col-12 col-md-7" style={{ position: 'relative' }}>
               <input
                  type="text"
                  className="form-control date-range-picker-toggle"
                  ref={datePickerToggleRef}
                  value={dateRange}
                  onClick={() => setOpen(!open)}
                  onChange={(v) => { }}
                  style={{ minWidth: '225px' }}
               />
               <ADateRangePicker
                  open={open}
                  onChange={(ranges: any) => {
                     const { startDate, endDate } = ranges;
                     setStartDate(moment(startDate).format('YYYY-MM-DD'));
                     setEndDate(moment(endDate).format('YYYY-MM-DD'));
                     setDateRange(
                        moment(new Date(startDate))
                           .format('YYYY-MM-DD')
                        + ' to ' +
                        moment(new Date(endDate))
                           .format('YYYY-MM-DD')
                     );
                     setOpen(false)
                  }}
               />
            </div>

            <div className="col-12">
               <button type="submit" className="btn btn-primary">Submit</button>
            </div>

         </form>
      </>
   );
} 