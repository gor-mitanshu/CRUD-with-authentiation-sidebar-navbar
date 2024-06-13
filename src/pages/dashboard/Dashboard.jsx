import React from 'react'
import Card from '../../ui/card/Card'
import Charts from '../charts/Chart'

const Dashboard = () => {
     return (
          <>
               <div className="container mt-4">
                    <div className="row">
                         <div className="col-lg-4">
                              <Card title={ "Total User" }>
                                   <p className="card-text">{ "userCount" }</p>
                              </Card>
                         </div>

                         <div className="col-lg-4">
                              <Card title={ "Total Hobbies" }>
                                   <p className="card-text">{ "totalHobbies" }</p>
                              </Card>
                         </div>

                         <div className="col-lg-4">
                              <Card title={ "Gender Distribution" }>
                                   <p className="card-text d-flex justify-content-between">
                                        <span>Male: <b>{ 0 }</b></span>
                                        <span>Female: <b>{ 0 }</b></span>
                                        <span>Other: <b>{ 0 }</b></span>
                                   </p>
                              </Card>
                         </div>
                    </div>

                    <div className="row mt-4">
                         <div className="col-lg-12">
                              <Charts />
                         </div>
                    </div>
               </div>
          </>
     )
}

export default Dashboard