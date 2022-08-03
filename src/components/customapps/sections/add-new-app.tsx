import { useState } from "react";
import SectionTitle from "../../common/snippets/section-title";
import { createCustomApp, getCustomApps } from "../api";
import { useUtility, useCustomApps } from "../../../store";

export default function AddNewCustomApp () {
   const [errors, setErrors] = useState([]);
   const { setCustomApps } = useCustomApps();
   const {setIsLoading} = useUtility();

   const handleOnSubmit = (e: any) => {
      e.preventDefault();
      const d: any = new FormData(e.target);
      for (const [key, value] of d.entries()) {
         console.log(key, value);
         d[key] = value;
      }
      createCustomApp(d)
      .then((data: any) => {
         if(data?.app) {
            setIsLoading(true);
            getCustomApps()
            .then((data: any) => {
               if(data?.apps?.length > 0) setCustomApps(data?.apps);      
               setIsLoading(false);
            })
            .catch((error: any) => {
               console.log(error);    
               setIsLoading(false);  
            })
         };
         if(data?.error) setErrors(data.data);
      })
      .catch(e => console.error(e))
   }
   return (
      <>
      <SectionTitle title="Add new app" />
        <div className="row">
         {errors.length > 0 && <div className="col-12">
            <div className="alert alert-danger d-flex align-items-start flex-column" role="alert">            
               {errors.map((error: any, index: number) => (
                  <div key={index}>{error.message}</div>
               ))}
            </div>
         </div>}

         {errors.length > 0 && <div className="col-12">
            <div className="alert alert-danger d-flex align-items-start flex-column" role="alert">            
               {errors.map((error: any, index: number) => (
                  <div key={index}>{error.message}</div>
               ))}
            </div>
         </div>}
         
          <div className="col-12">
            <form method="POST"
               onSubmit={handleOnSubmit}
            >
               
               <div className="mb-3">
               <label htmlFor="app_name" className="form-label">App Name:</label>
               <input name="app_name" type="text" className="form-control" id="app_name" aria-describedby="appHelp" />
               <div id="appHelp" className="form-text">We'll never share your email with anyone else.</div>
               </div>
               <div className="mb-3">
               <label htmlFor="store_domain" className="form-label">Associated Store's Shopify Domain:</label>
               <input name="store_domain" type="text" className="form-control" id="store_domain" />
               </div>

               <div className="mb-3">
               <label htmlFor="api_key" className="form-label">App Api Key:</label>
               <input name="api_key" type="text" className="form-control" id="api_key" />
               </div>  
               <div className="mb-3">
               <label htmlFor="api_secret" className="form-label">App Api Secret:</label>
               <input name="api_secret" type="text" className="form-control" id="api_secret" />
               </div>            
               <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </>
   );
}