import {destroyFurnitureAsync} from './furnitureSlice'

function ButtonGroup(props:any) {

    function handleClick(e:any) {
        const payload = {
            furniture: {
                furniture_id: props.furniture_id
            }
        }
        props.dispatch(destroyFurnitureAsync(payload));
    }
  return <div className="btn-group float-end">
      <button 
        className="btn btn-warning"
        onClick={() => props.toggleEditForm()}>Edit</button>
      <button 
      className="btn btn-danger" 
      onClick={(e) => handleClick(e)}>Delete</button>
  </div>;
}
export default ButtonGroup;