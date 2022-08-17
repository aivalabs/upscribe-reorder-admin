import { ICustomApp } from "../types"
import SectionTitle from "../../common/snippets/section-title"
import { deleteCustomApp } from "../api"
import { useUtility } from "../../../store"
export default function CustomAppsList({ customApps }: any) {
   const { setIsHardReload } = useUtility();
   return (
      <>
         <SectionTitle title="All apps" />
         <div className="row">
            <div className="col-12">
               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col">App name</th>
                        <th scope="col">Store domain</th>
                        <th scope="col">Api key</th>
                        <th scope="col">Api secret</th>
                        <th scope="col">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {customApps.length > 0 ? customApps.map((app: ICustomApp) => (
                        <tr key={app.id}>
                           <td>{app.appName}</td>
                           <td>{app.storeDomain}</td>
                           <td>{app.apiKey}</td>
                           <td>{app.apiSecret}</td>
                           <td>
                              <button data-app-id={app.id} className="btn btn-danger btn-sm" onClick={(e: any) => {
                                 if (window.confirm('Are you sure you want to delete this app?')) {
                                    e.target.dataset.appId && deleteCustomApp(e.target.dataset.appId).then(() => {
                                       setIsHardReload(true);
                                    })
                                 }
                              }}>Delete</button>
                           </td>
                        </tr>
                     )) : <tr><td colSpan={5}>No apps found</td></tr>}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   )
}