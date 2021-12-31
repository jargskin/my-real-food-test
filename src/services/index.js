import { db, auth } from '../config/firebase';
import { 
  addDoc, collection, doc, getDoc, getDocs, orderBy, serverTimestamp, query, deleteDoc, updateDoc,
} from 'firebase/firestore';



const addTask = async (data) => {
  const user = auth.currentUser;

  let ref = collection(db, 'tasks');
  data.userId = user.uid;
  data.timestamp = serverTimestamp();
  const docRef = await addDoc(
    ref,
    data,
  )
  .then(() => {
    const data = {
      status: 200,
      message: 'Tarea agregada exitosamente',
    }
    return data;
  })
  .catch(() => {
    const error = {
      status: 400,
      message: 'Ocurrio un problema al guardar los datos',
    }
    return error
  });
  return docRef;
}
const getAllTask = async () => {

  const collectionRef = collection(db, "tasks");
  const q = query(collectionRef, orderBy("timestamp", "desc"));

  const data = await getDocs(q)
  const user = auth.currentUser;
  let task = [];
  
  data.docs.forEach((item) => {
    if (item.data().userId === user.uid)
      task.push({...item.data(), id: item.id})
  })
  
  return task;
}
const getOneTask = async (id) => {
  const ref = doc(db, 'tasks', id)
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    const data = {
      ...docSnap.data(),
      id: docSnap.id
    }
    return data;
  }
  else {
    return 'datos no encontrados'
  }
}
const deleteTask = async (id) => {
  const ref = doc(db, 'tasks', id)
  const docSnap = await getDoc(ref);

  if (docSnap.exists())
    return await deleteDoc(ref)
    .then(() => {
      const data = {
        status: 200,
        message: 'Datos eliminados exitosamente',
      }
      return data;
    })
    .catch(() => {
      const error = {
        status: 400,
        message: 'Ocurrio un problema al eliminar los datos',
      }
      return error
    });
  else 
    return 'datos no encontrados'
}
const editTask = async(data) => {
  const ref = doc(db, 'tasks', data.id)
  const updatedData = {
    name_task: data.name_task,
    description_task: data.description_task,
    timestamp: serverTimestamp(),
  }
  const resp = await updateDoc(ref, updatedData)
    .then(() => {
      const data = {
        status: 200,
        message: 'Datos guardados exitosamente',
      }
      return data;
    })
    .catch(() => {
      const error = {
        status: 400,
        message: 'Ocurrio un problema al guardar los datos',
      }
      return error
    });
  return resp
}

export { addTask, getAllTask, getOneTask, deleteTask, editTask };
