/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import Modal from '../../components/Modal';
import { addTask, getAllTask, getOneTask, deleteTask, editTask } from '../../services';

const Task = () => {
  const [Tasks, setTasks] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskEdit, setTaskEdit] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getTasks = async () => {
    const list = await getAllTask();
    setTasks(list);
  }
  const addingTask = async (data) => {
    setIsLoading(true);
    const resp = await addTask(data);
    if (resp.status === 200) {
      setIsLoading(false);
      getTasks()
      Swal.fire({
        icon: 'success',
        text: resp.message,
      })
    }
  };
  const gettingTask = async (id) => {
    const task = await getOneTask(id);
    if(task) {
      setTaskEdit(task)
    }
  }
  const editingTask = async (data) => {
    setIsLoading(true);
    Swal.fire({
      title: 'Vas a actualizar esta tarea, estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Actualizar'
    }).then( async (result) => {
      if (result.isConfirmed) {
        const resp = await editTask(data)
        setIsLoading(false);
        if (resp.status === 200) {
          getTasks()
          Swal.fire({
            icon: 'success',
            text: resp.message,
          })
        } else {
          Swal.fire({
            icon: 'warning',
            text: resp.message,
          })
        }
      }      
    })
  }
  const deletingTask = async (id) => {
    Swal.fire({
      title: 'Estas seguro de eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then( async (result) => {
      if (result.isConfirmed) {       
        setIsLoading(true);
        const resp = await deleteTask(id);
        setIsLoading(false);
        if (resp.status === 200) {
          getTasks()
          Swal.fire({
            icon: 'success',
            text: resp.message,
          })
        } else {
          Swal.fire({
            icon: 'warning',
            text: resp.message,
          })
        }
      }
    })
  }

  useEffect(() => {
    setIsLoading(true);
    getTasks()
  }, [])
  useEffect(() => {
    if (Tasks) {
      setIsLoading(false);
    }
  }, [Tasks])
  useEffect(() => {
    if (taskEdit){
      handleShow();
    }
  }, [taskEdit])
  useEffect(() => {
  }, [isLoading])



  return (
    <>
      <TaskForm
        addingTask={addingTask}
      />
      {
        (Tasks) && (
          <TaskList
            list={Tasks}
            deletingTask={deletingTask}
            gettingTask={gettingTask}
            isLoading={isLoading}
          />
        )
      }
      {
        (taskEdit) && (
          <Modal
            show={show}
            handleClose={handleClose}
            values={taskEdit}
            editingTask={editingTask}
          />
        )
      }
    </>
  )
}
export default Task;
