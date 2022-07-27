export default function SectionTitle({ text }: any): JSX.Element {
   return (
      <div className="row mt-5 border-bottom border-secondary">
         <div className="col-12">
            <h4 className="h3">{text}</h4>
         </div>
      </div>
   );


}