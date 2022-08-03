export interface ICustomApp {
   id: string;
   appName: string;
   storeDomain: string;
   apiKey: string;
   apiSecret: string;
   createdAt?: string;
   updatedAt?: string;
}

export interface ICreateCustomApp {
   app_name: string;
   store_domain: string;
   api_key: string;
   api_secret: string;
}

export interface ICustomAppState {
   customApps: ICustomApp[];
   setCustomApps: (customApps: ICustomApp[]) => void;
}

