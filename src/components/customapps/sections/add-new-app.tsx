import { useState } from "react";
import SectionTitle from "../../common/snippets/section-title";
import { createCustomApp } from "../api";

export default function AddNewCustomApp () {
   const [errors, setErrors] = useState([]);
   const handleOnSubmit = (e: any) => {
      e.preventDefault();
      const d: any = new FormData(e.target);
      for (const [key, value] of d.entries()) {
         console.log(key, value);
         d[key] = value;
      }
      createCustomApp(d)
      .then((data: any) => {
         if(data?.app) console.log('created', data.app);
         if(data?.error) console.log('error', data.data);
      })
      .catch(e => console.error(e))
   }
   return (
      <>
      <SectionTitle title="Add new app" />
        <div className="row">
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