import axios from 'axios';
import { ICustomApp, ICreateCustomApp } from "./types";

const API_HOST = process.env.REACT_APP_API_HOST || 'https://upscribe-repeat-mvp.herokuapp.com';

export const getCustomApps = async () => {
   try {
      const response: any = await axios({
         method: 'get',
         url: `${API_HOST}/master-admin/custom-apps`,
         headers: {
            'authorization': `Bearer ${localStorage.getItem('auth_token')}`,
         }
      });
      let apps: ICustomApp[] = response?.data?.data || [];
      if (apps.length) apps = apps.map((app: any) => ({
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
         'status': response.status,
         'message': 'success'
      };
   } catch (error: any) {
      console.log(error)
      return {
         'message': error.message,
         'status': error?.reponse?.status,
         'errors': error?.response?.data?.errors
      };
   }
}

export const createCustomApp = async (payload: ICreateCustomApp) => {
   try {
      const res: any = await axios({
         method: 'post',
         url: `${API_HOST}/master-admin/custom-apps`,
         data: JSON.stringify(payload),
         headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('auth_token')}`,
         }
      });

      return {
         'app': res?.data?.data,
         'status': res.status,
         'message': 'success'
      }
   } catch (error: any) {
      return {
         'message': error.message,
         'status': error?.response?.status,
         'errors': error?.response?.data?.errors
      }
   }

}

export const deleteCustomApp = async (id: string) => {
   try {
      const res: any = await axios({
         method: 'delete',
         url: `${API_HOST}/master-admin/custom-apps/${id}`,
         headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('auth_token')}`,
         }
      });

      return {
         'status': res.status,
         'message': 'Successfuly deleted'
      }
   } catch (error: any) {
      return {
         'message': error.message,
         'status': error?.response?.status,
         'errors': error?.response?.data?.errors
      }
   }
}