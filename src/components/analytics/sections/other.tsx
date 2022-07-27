import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Card from "../snippents/card";
import SectionTitle from "../snippents/section-title";
import { IOtherSectionProp, ITopReorderedProducts } from "../types";
import { useUtility } from "../../../store";

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels );
export default function Other({title, other, topReorderedProducts} : IOtherSectionProp ): JSX.Element {   
   const {isLoading} = useUtility();
   const data: any = { 
      labels: ['Product 1', 'Product 2', 'Others'],
      datasets: [{
         data: [27.92, 17.53, 14.94],
         backgroundColor: ['green', 'blue', 'yellow'],
         borderWidth: 0.5 ,
         borderColor: '#FFF'
      }]
   };
   const options: any =  {
      title: {
         display: true,
         text: 'What % of orders are from',
         position: 'top',
         fontSize: 20,
         fontColor: '#000',
         padding: 20
      },
      plugins: {
         legend: {
            display: true,
            position: 'right',
            labels: {
               boxWidth: 20,
               fontColor: '#FFF',
               padding: 15
            }
        }
      },
      tooltips: {
         enabled: false
      }      
   };

   const plugins: any = {
      datalabels: {
         color: '#FFF',
         textAlign: 'center',
         font: {
            lineHeight: 1.6,
            color: '#FFF'
         },
         formatter: function(value: any, ctx: any) {
            return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
         }
      }
   }
   return (
      <>
         <SectionTitle title={title} />
         <div className="row mt-3">
            <div className="col-12 col-md-3">
               <div className="d-flex flex-column">
                  <Card name="Average Order Value" value={other.avgOrderValue} />
                  <br />
                  <Card name="Lowest Order Value" value={other.lowestOrderValue} />
                  <br />
                  <Card name="Highest Order Value" value={other.lowestOrderValue} />
               </div>
            </div>
            <div className="col-12 col-md-9">
               <div className="row">
                  <div className="col-12 col-md-7">
                  <Chart data={data} type="doughnut" options={options} plugins={[plugins]}/>
                  </div>
                  <div className="col-12 col-md-5">                        
                     <table className="table">
                        <thead>
                           <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Reorders</th>
                           </tr>
                        </thead>
                        <tbody>
                           {isLoading && <tr><td colSpan={3} align="center"><span className="spinner-grow" role="status"></span></td></tr>}
                           {!isLoading && !topReorderedProducts[0]?.title? (<tr><td colSpan={3}>Not product found!</td></tr>): !isLoading && topReorderedProducts.map((product: ITopReorderedProducts, index: number) => {
                              return (<tr key={index}>
                                 <td>{product.title}</td>
                                 <td>{product.price}</td>
                                 <td>{product.count}</td> 
                              </tr>)
                           })}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </>
      
   );
}