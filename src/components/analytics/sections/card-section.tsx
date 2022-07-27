import Card from "../snippents/card";
import { Loader } from "../loader";
import { ICardSection } from "../types";
export default function CardSection({title, card}: ICardSection): JSX.Element {
   return (
      <div className="row mt-3">
         <div className="col-12">
            <h4 className="h3">{title}</h4>
         </div>
         {card? (
            <>
               <div className="col-6 col-md-3"><Card name="Overall" value={card.total} /></div>
               <div className="col-6 col-md-3"><Card name="From Email" value={card.fromEmail} /></div>
               <div className="col-6 col-md-3"><Card name="From My Account Dashboard" value={card.fromDashboard} /></div>
               <div className="col-6 col-md-3"><Card name="From Order Detail Page" value={card.fromDetailPage} /></div>
            </>
         ):
            <Loader />
         }
      </div>
   );
}