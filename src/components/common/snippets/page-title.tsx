export default function PageTitle({ title, element }: any): JSX.Element {
   return (
      <div className="row mt-5">
         <div className={element? 'col-12 col-md-4': 'col-12'}>
            <h2 className="h2">{title}</h2>
         </div>
         {element? <div className="col-12 col-md-8 d-flex justify-content-end">
            {element}
         </div>: null}
      </div>
   );
}