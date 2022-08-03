import axios, { AxiosError } from "axios"
import { ICustomApp, ICreateCustomApp } from "./types";
export const getCustomApps = async () => {
   try {
      const response: any = await axios({
         method: 'get',
         url: `/master-admin/custom-apps`
      });
      let apps: ICustomApp[] = response?.data?.data || [];
      if(apps.length) apps = apps.map((app: any) => ({
         id: app.id,
         appName: app.app_name,
         storeDomain: app.store_domain,
         apiKey: app.api_key,
         apiSecret: app.api_secret,
         createdAt: app.createdAt,
         updatedAt: app.updatedAt
      }));

      return {
         'apps': apps,
         'status': response.status
      };
   } catch (error: any) {
      console.log(error )
      return {
         'error': error.message,
         'status': error?.reponse?.status,
         'data': error?.response?.data?.errors
      };
   }   
}

export const createCustomApp = async (payload: ICreateCustomApp) => {
   console.log(JSON.stringify(payload), 'JSON.stringify(payload)')
   try {
      const res: any = await axios({
         method: 'post',
         url: `/master-admin/custom-apps`,
         data: JSON.stringify(payload),
         headers: {
            'Content-Type': 'application/json',            
         }
      });

      return {
         'app': res?.data?.data,
         'status': res.status
      }
   } catch (error: any) {
      return {
         'error': error.message,
         'status': error?.response?.status,
         'data': error?.response?.data?.errors
      }
   }

}