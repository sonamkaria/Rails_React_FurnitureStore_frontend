import React, { useState, useEffect } from 'react'
import ButtonGroup from './ButtonGroup'

function Furniture(props:any) {
  const [title, setTitle] = useState(props.furniture.title);
  const [body, setBody] = useState(props.furniture.body);
  const [image, setImage] = useState(props.furniture.image);
  const [isEditing, setIsEditing] = useState(props.furnitureToEdit === props.furniture.id);
  
  useEffect(() => {
      setIsEditing(props.furnitureToEdit === props.furniture.id);
  }, [props.furnitureToEdit, props.furniture.id])

  function submitHandler(e:any) {
      e.preventDefault();
      const formData = {
          furniture: {
              id: props.furniture.id,
              title: title,
              body: body,
              image: image,
          }
      }
      props.submitEdit(formData)
      resetState();
  }

  function resetState() {
      setTitle(props.furniture.title);
      setBody(props.furniture.body);
      setImage(props.furniture.image)
  }

  const titleElement = <h2 className="title text-start">{props.furniture.title}</h2>;
  const bodyElement = <p className="card-text text-start">{props.furniture.body}</p>;
  const imageElement = <img className="card-text text-start">{props.furniture.image}</img>;
  
  const editableTitle = <input 
                          type="text" 
                          className="form-control text-start" 
                          value={title} 
                          onChange={(e) => setTitle(props.furniture.title)} />;
  const editableBody = <textarea 
                          className="form-control text-start"
                          value={body}
                          onChange={(e) => setBody(e.target.value)} />;
  
  const editableImage = <textarea 
                          className="form-control text-start"
                          value={image}
                          onChange={(e) => setImage(e.target.value)} />;


  const submitButton = <button
                          type="submit"
                          className="form-control"
                          onClick={(e) => submitHandler(e)}>Submit</button>;
  
  return (<div>
    <div className="row">
      <div className="col-8">
      {isEditing ? editableTitle : titleElement}
      </div>
      <div className="col-4"></div>
        <ButtonGroup
        furniture_id={props.furniture.id}
        dispatch={props.dispatch}
        toggleEditForm={props.toggleEditForm} />

    </div>

    <div className="row">
      <div className="col-8">
      {isEditing ? editableBody : bodyElement}
      </div>
    </div>
    <div className='row'>
      <div className="col-2">
      {isEditing ? submitButton : ""}
      </div>

    </div>
    <div className="row">
      <div className="col-8">
      {isEditing ? editableImage : imageElement}
      </div>
    </div>
    <div className='row'>
      <div className="col-2">
      {isEditing ? submitButton : ""}
      </div>

    </div>

  </div>
  )
}

export default Furniture
