import randomColor from 'randomcolor';
import {v4 as uuidv4} from 'uuid';
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[item, setItem]=useState('')

  const[items, setItems]=useState(
    JSON.parse(localStorage.getItem('items'))||[]
  )

  const newItem=()=>{
    if(item.trim()!==''){
      const newItem={
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity:'bright'
        }),
        defaultPos:{
          x: 500,
          y: -500
        }
      }
      setItems((items)=>[...items, newItem])
      setItem('')
    }else{
      alert('Enter task...')
      setItem('')
    }

  }

  const deleteItem=(id)=>{
    setItems(items.filter((item)=>item.id!==id))
  }

  const updatePos=(data, index)=>{
    let newArr=[...items]
    newArr[index].defaultPos={x: data.x, y: data.y}
    setItems(newArr)
  }

  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(items))
  },[items])
  return (
    <div className="App">
      <div className='wrapper'>
        <input 
          className='input'
          type='text'
          placeholder='Enter task...'
          onChange={(e)=>setItem(e.target.value)}
          ></input>
        <button className='button' onClick={newItem}>ENTER</button>
      </div>
      {
        items.map((item, index)=>{
          return(
            <Draggable
             key={index}
             defaultPosition={item.defaultPos}
             onStop={(_, data)=>{updatePos(data, index)}}
             
            >

              <div className='todo_item' style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button 
                 className='delete'
                 onClick={()=>deleteItem(item.id)}>Х</button>
                 
              </div>

             </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
