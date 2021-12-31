import React, { useEffect } from 'react'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../../components/Loading';

const TaskList = ({ list, deletingTask, gettingTask, isLoading }) => {
  useEffect(() => {   
    console.log(isLoading) 
  }, [isLoading])
  return (
    <>
      {
        isLoading ?
        <Loading /> :
        list.map(task => (
          <div className='card mt-2 p-2' key={task.id}>
            <div className="card-title d-flex justify-content-between">
              <h4> {task.name_task} </h4>
              <div>
                <span className='px-1'>
                  <FontAwesomeIcon className='text-warning' icon={faEdit} onClick={() => gettingTask(task.id)} />
                </span>
                <span className='px-1'>
                  <FontAwesomeIcon className='text-danger' icon={faTimes} onClick={() => deletingTask(task.id)} />
                </span>
              </div>
            </div>
            <div className="card-body">
              <p> {task.description_task} </p>
            </div>
          </div>
        ))        
      }
    </>
  )
}
export default TaskList;
