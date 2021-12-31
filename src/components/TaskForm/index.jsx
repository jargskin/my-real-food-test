import React, { useState, useEffect } from 'react'
import { faTasks, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../../components/Loading';

const TaskForm = ({addingTask}) => {
  const initialStateValues = {
    name_task: '',
    description_task: '',
  }
  const [valuesForm, setValuesForm] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValuesForm({
      ...valuesForm,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addingTask(valuesForm);
    setValuesForm({...initialStateValues})
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
          value={valuesForm.name_task}
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
          value={valuesForm.description_task}
        />
      </div>
      <button className='btn btn-primary btn-block'>
        Guardar
      </button>
    </form>
  )
}
export default TaskForm;
