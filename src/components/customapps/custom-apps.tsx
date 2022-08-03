import { useEffect } from "react";
import { useCustomApps } from "../../store";
import { Loader } from "../analytics/loader";
import PageTitle from "../common/snippets/page-title";
import { getCustomApps } from "./api";
import CustomAppsList from "./sections/customapplist";
import { useUtility } from "../../store";
import AddNewCustomApp from "./sections/add-new-app";

export default function CustomApps() {
  const { customApps, setCustomApps } = useCustomApps();
  const {isLoading, setIsLoading} = useUtility();
  useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <>
        <PageTitle title="Manage Custom Apps"/>        
        {isLoading? <Loader /> : (<>
          <CustomAppsList customApps={customApps} />
          <AddNewCustomApp />
        </>)}
      </>

  );
}