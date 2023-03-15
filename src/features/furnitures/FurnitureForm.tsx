
import { useDispatch } from 'react-redux'
import React, {useState} from 'react';
import {createFurnitureAsync} from './furnitureSlice';
import {ThunkDispatch} from "@reduxjs/toolkit";

function FurnitureForm() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const[title, setTitle] = useState('')
  const[body, setBody] = useState('')
  const[image, setImage] = useState('')

  const[color, setColor] = useState('')


  function submitHandler(e:any){
    e.preventDefault();
    const formData = {
      furniture: {
        title:title,
        body:body,
        image:image,
        color:color,

      }
    }
    dispatch(createFurnitureAsync(formData));
    resetState()
  }



function resetState(){
  setTitle('');
  setBody('');
  setImage('');
  setColor('')
}


  return (
    <div>
      <form>
        <input
        type = "text"
        className="form-control text-start"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
        <textarea
        className='form-control text-strart'
        name="body"
        value={body}
        placeholder="body"
        onChange={(e)=> setBody(e.target.value)}
        />
        <input
        type = "text"
        className="form-control text-start"
        name="image"
        placeholder="image"
        value={image}
        onChange={(e) => setImage(e.target.value)} />


<input
        type = "text"
        className="form-control text-start"
        name="color"
        placeholder="color"
        value={color}
        onChange={(e) => setColor(e.target.value)} />


        <button
          type="submit"
          onClick={(e) => submitHandler(e)}>Submit</button>
      </form>
    </div>
  )
}

export default FurnitureForm
