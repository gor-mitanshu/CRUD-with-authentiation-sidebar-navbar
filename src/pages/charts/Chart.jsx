import React from 'react'
import Chart from "react-apexcharts";
import Card from '../../ui/card/Card';

const option = {
     series: [
          {
               data: [
                    { x: "Code", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()] },
                    { x: "Test", y: [new Date("2019-03-04").getTime(), new Date("2019-03-08").getTime()] },
                    { x: "Validation", y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()] },
                    { x: "Deployment", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] }
               ]
          }
     ],
     options: {
          plotOptions: { bar: { horizontal: true } },
          chart: { zoom: { enabled: false } },
          yaxis: { show: false },
          xaxis: { type: "datetime" },
          grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } }
     }
};
const Charts = () => {
     return (
          <>
               <Card title={ "Chart" }>
                    <div className="chart-container">
                         <Chart
                              options={ option.options }
                              series={ option.series }
                              type="rangeBar"
                              width="100%"
                              height="450"
                         />
                    </div>
               </Card>
          </>
     )
}

export default Charts