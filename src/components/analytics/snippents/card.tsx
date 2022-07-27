import { IAnalyticCardProp } from "../types";
export default function Card({name, value}: IAnalyticCardProp): JSX.Element {
   return (
      <div className="card border-secondary p-2 text-left">
         <h2 className="card-title m-0">{value}</h2>
         <div className="card-body p-0">{name}</div>
      </div>
   );
}