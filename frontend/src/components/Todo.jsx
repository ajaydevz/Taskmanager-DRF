import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Todo() {

  const [ todos,setTodos ] = useState([]);

  useEffect(()=>{
    const getdata = async()=>{
        try {
            const response = await axios.get('http://127.0.0.1:8000/todo/todos/')
            console.log(response,'???????????????????')
        } catch (error) {
            console.log(error)
        }

    }
    getdata();
  },[])


  return (
    <div>
      <h1>hyyy</h1>
    </div>
  )
}

export default Todo
