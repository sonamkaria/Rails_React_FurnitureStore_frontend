import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../app/hooks'
import { fetchFurnituresAsync, selectFurnitures, selectStatus, Statuses, updateFurnitureAsync } from './furnitureSlice'
import {ThunkDispatch} from "@reduxjs/toolkit";
import Furniture from './Furniture';
import FurnitureForm from './FurnitureForm';


function Furnitures() {
    const furnitures = useAppSelector(selectFurnitures)
    const status = useAppSelector(selectStatus)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [furnitureToEdit, setPostToEdit] = useState(0);

    useEffect(() => {
        dispatch(fetchFurnituresAsync());
    },[dispatch]);
    
    function toggleEditForm(furniture_id?:number) {
        if (furnitureToEdit === furniture_id) {
            setPostToEdit(0);
        } else {
              setPostToEdit(furniture_id as number);
        }
    }

    function submitEdit(formData:any) {
        dispatch(updateFurnitureAsync(formData));
        toggleEditForm();
    }
  


    let contents;
        if(status !== Statuses.UpToDate){
            contents = <div>{status}</div>
        } else {
            contents = <div className="card">
                
                <FurnitureForm />
                {furnitures && furnitures.length > 0 && furnitures.map(furniture => {
                    return <div key={furniture.id} style={{margin:"5em"}}>
                        {/* <h3>{furniture.title}</h3>
                        <p>{furniture.body}</p> */}
                        < Furniture
                        dispatch= {dispatch}
                        furniture={furniture}
                        toggleEditForm={() => toggleEditForm(furniture.id)}
                        furnitureToEdit={furnitureToEdit}
                        submitEdit={submitEdit}
                        />
                        </div>
                })}
            </div>
        }

    return (
        <div>
            <ul className="nav justify-content-center">
  <li className="nav-item">
    <a className="nav-link active" href="#">SK Designs</a>
  </li>
  </ul>

            {/* <h1 className="display-1">SK Designs</h1> */}
            {contents}
        </div>
    )
}

export default Furnitures
