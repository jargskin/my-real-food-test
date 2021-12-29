import React, { useState } from 'react'
import { faTasks, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TaskForm = ({addOrEditTask}) => {
  const [values, setValues] = useState({
    name_task: '',
    description_task: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditTask(values);
  }

  return (
    <form action="" onSubmit={handleSubmit} className='card card-body'>
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <FontAwesomeIcon icon={faTasks} />
        </div>
        <input
          type="text"
          className='form-control'
          placeholder='Nombre tarea' name='name_task'
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group mb-2">
        <div className="input-group-text bg-light">
          <FontAwesomeIcon icon={faBook} />
        </div>
        <input
          type="text"
          className='form-control'
          placeholder='Descripción tarea'
          name='description_task'
          onChange={handleInputChange}
        />
      </div>
      <button className='btn btn-primary btn-block'>
        Guardar
      </button>
    </form>
  )
}
export default TaskForm;
