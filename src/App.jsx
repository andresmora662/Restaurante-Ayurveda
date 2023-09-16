import React, { useEffect, useState } from 'react'
import { db } from "./firebase/firebase"
import { collection,getDocs,addDoc,doc, deleteDoc,updateDoc } from 'firebase/firestore'
// JS


const App = () => {
// Declaración de hooks o declaraciones de estad deben estar dentro de la función componente App
// UseState = almacena el estado inicial
// user = almacena el estado actual
// setUser = almacena el estado que se actualizará

const [users, setUser] = useState([])
const [name, setName] = useState ("")
const [mail, setMail] = useState ("")
const [mesa, setMesa] = useState (0)
const [date, setDate] = useState (null)
//Formulario
const[formUpdate, setUpdateform] = useState(false)// Inicializar el estado de formUpdate
const[item, setItem] = useState(null)// Inicializar el estado de item

const refCollection = collection (db, "reservaciones")

// La función getUser se declara fuera del useEffect para que sea accesible en toda la función componente
const getUser = async() =>{
  const data = await getDocs(refCollection);
//cambiar get por set
  setUser(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
}
 // La Declaración de useEffect debe estar dentro de la función componente App
 useEffect(() => {
//La funcion getUser debe estar dentro del componente App y
 

// Llamada a getUser dentro de useEffect y fuera del mismo "getUser"
  getUser();

  },[]);

  // Declaración de la función createUser dentro de la función componente App y fuera de useEffect
  const createUser = async () => {
    await addDoc(refCollection,{
      nombre: name, 
      correo: mail, 
      mesa: mesa, 
      date:date});
  }

  const borrarUser = async (id) => {
    const userDoc = doc(refCollection, id);
    await deleteDoc(userDoc);
    getUser(); //Llamar a getUser para actualizar la lista de usuarios después de eliminar
  }

const formUpdateOpen = (data) => {
  setUpdateform(true)
  setItem(data)
}


const handleChange = (e) => {
  setItem({
    ...item,
    [e.target.name]: e.target.value
  })
}


  const upDate = async (id) => {
    await updateDoc (doc(refCollection, id), item);
    setUpdateform(false); // Cerrar el formulario de actualización después de realizar la actualización
    getUser(); // Llamar a getUser para actualizar la lista de usuarios después de actualizar
  }


  return (
    <div className='contenedor-formulario-completo'>
      {/* html */}

      <div className='contenedor-formulario' >
        <h1>Reservar</h1>
        <br />

        <h1>Nombre</h1>
        <input type= "text" placeholder='Nombre' onChange={(e)=>{setName(e.target.value)}}></input>
        <h1>Correo</h1>
        <input type= "text" placeholder='Correo'onChange={(e)=>{setMail(e.target.value)}}></input>
        <h1>N° De Personas</h1>
        <input type= "text" placeholder='N° de personas' onChange={(e)=>{setMesa(e.target.value)}}></input>
        <h1>Fecha</h1>
        <input type= "date" placeholder='Date'onChange={(e)=>{setDate(e.target.value)}}></input>
        <br />
        <br />
        <button onClick={createUser}>Enviar</button>
      </div>
      {users.map((item)=>(

        <div key={item.id}>
          <h2>¡Reserva realizada con exito!</h2>
          <br />
        <h2>Nombre: {item.nombre} </h2>
        <h2>Correo: {item.correo} </h2>
        <h2>N° personas: {item.mesa} </h2>
        <h2>Fecha: {item.date} </h2>
        <button onClick={()=> borrarUser(item.id)}>Borrar</button>
        <button onClick={()=> formUpdateOpen(item)}>Editar</button>
        <br />

        

      </div>
      ))} 

      {
        formUpdate && (
          <div>
            <h1>Nombre</h1>
            <input type= "text" placeholder='Nombre' value={item.nombre} name='nombre' onChange={handleChange}></input>
            <h1>Correo</h1>
            <input type= "text" placeholder='Correo'value={item.correo} name='correo' onChange={handleChange}></input>
            <h1>N° De Personas</h1>
            <input type= "text" placeholder='N° de personas'value={item.mesa} name='mesa' onChange={handleChange}></input>
            <h1>Fecha</h1>
            <input type= "date" placeholder='Date'value={item.date} name='date' onChange={handleChange}></input>
            <button onClick={() => upDate(item.id)}>Actualizar</button>

          </div>
        )
      }
      
    </div>
  )
}

export default App
