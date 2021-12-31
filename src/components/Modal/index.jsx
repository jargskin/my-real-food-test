import { useEffect, useState } from 'react';
import { Modal, Button }  from 'react-bootstrap';
import { faTasks, faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FormModal = ({ show, handleClose, values, editingTask }) => {
  const [valuesForm, setValuesForm] = useState({ name_task:'', description_task:'' });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValuesForm({
      ...valuesForm,
      [name]: value
    })
  }
  useEffect(() => {
      setValuesForm(values)
  }, [values])

  const handleSubmit = (e) => {
    e.preventDefault();
    editingTask(valuesForm);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className='card card-body'>
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
            <Button type='submit' variant='primary'>
              Actualizar
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
