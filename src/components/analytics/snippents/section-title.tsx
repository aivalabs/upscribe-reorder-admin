export default function SectionTitle({ title }: any): JSX.Element {
   return (
      <div className="row mt-5">
         <div className="col-12">
            <h4 className="h4 border-bottom border-default pb-2">{title}</h4>
         </div>
      </div>
   );


}