import React from 'react'
import {uuidv4} from '../../utils/GenerateUuidv4';
import TaskForm from '../TaskForm';

import { db } from '../../config/firebase';
import { setDoc, doc } from 'firebase/firestore';

const Task = () => {

  const addOrEditTask = async (data) => {
    await setDoc(doc(db, 'tasks', uuidv4()), data)
    console.log(data);    
  }

  return (
    <>
      <TaskForm addOrEditTask={addOrEditTask} />
      <h1>Task</h1>
    </>
  )
}
export default Task;
