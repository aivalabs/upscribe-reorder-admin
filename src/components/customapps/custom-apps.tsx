import PageTitle from "../analytics/snippents/page-title";
import SectionTitle from "../analytics/snippents/section-title";

export default function CustomApps() {
  return (
      <>
        <PageTitle title="Manage Custom Apps"/>
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
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <SectionTitle title="Add new app" />
        <div className="row">
          <div className="col-12">
          <form>
            <div className="mb-3">
              <label htmlFor="appName" className="form-label">App Name:</label>
              <input name="appName" type="text" className="form-control" id="appName" aria-describedby="appHelp" />
              <div id="appHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="shopifyDomain" className="form-label">Associated Store's Shopify Domain:</label>
              <input name="shopifyDomain" type="text" className="form-control" id="shopifyDomain" />
            </div>

            <div className="mb-3">
              <label htmlFor="apiKey" className="form-label">App Api Key:</label>
              <input name="apiKey" type="text" className="form-control" id="apiKey" />
            </div>  
            <div className="mb-3">
              <label htmlFor="apiSecret" className="form-label">App Api Secret:</label>
              <input name="apiSecret" type="text" className="form-control" id="apiSecret" />
            </div>            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          </div>
        </div>
      </>

  );
}