import { ICustomApp } from "../types"
import SectionTitle from "../../common/snippets/section-title"
export default function CustomAppsList({customApps}: any) {
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
                  {customApps.length > 0? customApps.map((app: ICustomApp) => (
                  <tr key={app.id}>
                     <td>{app.appName}</td>
                     <td>{app.storeDomain}</td>
                     <td>{app.apiKey}</td>
                     <td>{app.apiSecret}</td>
                     <td>
                        <button className="btn btn-danger btn-sm">Delete</button>
                     </td>
                  </tr>
                  )): <tr><td colSpan={5}>No apps found</td></tr>}                
               </tbody>
            </table>
            </div>
         </div>
      </>
   )
}