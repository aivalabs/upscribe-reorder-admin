import { useRef, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import ADateRangePicker from "./date-range-picker";
export default function AnalyticsFilter() {
   
   const currentDate = new Date();
   const [open, setOpen] = useState(false);
   const [startDate, setStartDate] = useState(moment(currentDate).subtract(1, 'M').format('MM/DD/YYYY'));
   const [endDate, setEndDate] = useState(moment(currentDate).format('MM/DD/YYYY'));
   const [dateRange, setDateRange] = useState(startDate+' to ' + endDate);
   const [currentStore, setCurrentStore] = useState('');
   const stores: any[] = [
      {
         name: 'upscribe-stage',
         domain: 'upscribe-stage.myshopify.com'
      },
      {
         name: 'mednow-store',
         domain: 'mednow-store.myshopify.com'
      }
   ];
   const datePickerToggleRef = useRef(null);
   
   const history = useHistory();

   const handleFilter = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      history.push(`/?store_domain=${currentStore}=start_date=${startDate}&end_date=${endDate}`);
   }
   return (
      <>
      <form 
         onSubmit={handleFilter}
         className="row row-cols-lg-auto g-3 align-items-center justify-content-end" 
         style={{position: 'relative', width: '100%'}}>
         <div className="col-12 col-md-5">
            <label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</label>
            <select className="form-select" id="inlineFormSelectPref" name="store_domain" onChange={(e) => {
               setCurrentStore(e.target.value);
            }}>               
               {stores.map((store: any) => (<option key={store.domain} value={store.domain}>{store.name}</option>))}               
            </select>
         </div>

         <div className="col-12 col-md-7" style={{position: 'relative'}}>
            <input 
               type="text" 
               className="form-control date-range-picker-toggle" 
               ref={datePickerToggleRef}
               value={dateRange}
               onClick={() => setOpen(!open)}
               onChange={(v) => {}}
               style={{minWidth: '225px'}}
            />
            <ADateRangePicker
               open={open}
               onChange={(ranges: any) => {
                  const {startDate, endDate} = ranges;
                  setStartDate(moment(startDate).format('MM/DD/YYYY'));
                  setEndDate(moment(endDate).format('MM/DD/YYYY'));
                  setDateRange(
                     moment(new Date(startDate))
                     .format('MM/DD/YYYY') 
                     + ' to ' + 
                     moment(new Date(endDate))
                     .format('MM/DD/YYYY')
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