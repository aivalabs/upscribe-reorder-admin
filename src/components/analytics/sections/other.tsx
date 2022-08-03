import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Card from "../snippents/card";
import SectionTitle from "../../common/snippets/section-title";
import { IOtherSectionProp, ITopReorderedProducts } from "../types";

ChartJS.register(ArcElement, Tooltip, Legend,ChartDataLabels );


export default function Other({title, other, topReorderedProducts, totalReorderCounts} : IOtherSectionProp ): JSX.Element {   
   
   const chartData: any[] = topReorderedProducts.slice(0,2);
   const otherData: any[] = topReorderedProducts.slice(2,topReorderedProducts.length);
   if(topReorderedProducts.length > 2) chartData.push({
      title: 'Other',
      price: '$--',
      count: otherData.map((item) => item.count).reduce((acc, cur) => acc + cur, 0)
   })
   const data: any = { 
      title: 'Top Reordered Products2',
      labels: chartData.map((item: any) => item.title),
      datasets: [{
         data: chartData,
         backgroundColor: ['#3050f3', '#308df8', '#4dbe4b'],
         borderWidth: 0.5 ,
         borderColor: '#FFF',
         fontColor: '#FFF', 
         parsing: {
            key: 'count'
         },
         title: {
            display: false,
            text: 'Top Reordered Products 222',
            position: 'top',
            fontSize: 20,
            fontColor: '#000',
            fullSize: true,
            padding: 5
         },
         datalabels: {
            color: 'white',
            textAlign: 'center',
            font: {
               lineHeight: 1.6,
               color: '#FFF'
            },
            
            formatter: function(value: any, ctx: any) {
               return ((value.count * 100)/totalReorderCounts).toFixed(0)+ '%';
            }  ,
            tooltips: {
               enabled: false
            },
            
         }
      }]
   };
   const options: any =  {
      title: {
         display: false,
         text: 'Top Reordered Products 222',
         position: 'top',
         fontSize: 20,
         fontColor: '#000',
         fullSize: true,
         padding: 5
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
      },   
   };
   return (
      <>
         <SectionTitle title={title}/>
         <div className="row mt-3">
            <div className="col-12 col-md-3">
               <div className="d-flex flex-column">
                  <Card name="Average Order Value" value={other?.avgOrderValue} />
                  <br />
                  <Card name="Lowest Order Value" value={other?.lowestOrderValue} />
                  <br />
                  <Card name="Highest Order Value" value={other?.lowestOrderValue} />
               </div>
            </div>
            <div className="col-12 col-md-9">               
               <div className='border p-2'>
                  <div className="row">
                     <div className="col-12 col-md-6">
                        <h4 className='h5 position-absolute'>Top Reordered Products</h4>
                        <div className="d-flex align-item-start justify-content-center chartWrapper">
                           <Chart style={{maxWidth: '350px', maxHeight: '350px'}} data={data} type="doughnut" options={options}/>
                        </div>
                     </div>
                     <div className="col-12 col-md-6">                        
                        <table className="table border-left">
                           <thead>
                              <tr>
                                 <th>Product</th>
                                 <th>Price</th>
                                 <th>Reorders</th>
                              </tr>
                           </thead>
                           <tbody>
                              
                              {!topReorderedProducts[0]?.title? (<tr><td colSpan={3}>No product found!</td></tr>)
                                 : topReorderedProducts.map((product: ITopReorderedProducts, index: number) => {
                                 return (<tr key={index}>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.count}</td> 
                                 </tr>)
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
      
   );
}