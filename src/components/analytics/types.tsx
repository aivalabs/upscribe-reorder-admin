export interface IAnalyticCardProp {
   value: string|number;
   name: string;
}

export interface ITopReorderedProducts {
   title: string;
   price: string;
   count: number;
}
export interface IOrderInfo {
   total: number|string;
   fromEmail: number|string;
   fromDashboard: number|string;
   fromDetailPage: number|string;
}
export interface IOtherAnalyticsInfo {
   avgOrderValue: string;
   lowestOrderValue: string;
   highestOrderValue: string;
};

export interface IOrderCountSources {
   orderCounts: IOrderInfo;
   revenue: IOrderInfo;
   other: IOtherAnalyticsInfo;
}

export interface IAnalyticsState {
   orderCountSources: IOrderCountSources;   
   setIOrderCountSources: (IOrderCountSources: IOrderCountSources) => void;
   topReorderedProducts: ITopReorderedProducts[];
   setTopReorderedProducts: (trp: ITopReorderedProducts[]) => void;
   totalReorderCounts: number;
   setTotalReorderCounts: (t: number) => void;
}


export interface ICardSection {
   title: string;
   card: IOrderInfo;
}

export interface IOtherSectionProp {
   title: string;
   other: IOtherAnalyticsInfo;
   topReorderedProducts: ITopReorderedProducts[];
   totalReorderCounts: number;
}