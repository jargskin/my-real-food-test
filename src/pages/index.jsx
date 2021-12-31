import React from 'react'
import Task from '../templates/Task';

const Home = () => {
  return (
    <div className='container p-4'>
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <Task />
        </div>
      </div>
    </div>    
  )
}
export default Home;
