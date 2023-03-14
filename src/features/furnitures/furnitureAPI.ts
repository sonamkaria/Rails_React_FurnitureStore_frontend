import { FurnitureFormData, FurnituresState, FurnitureDeleteData } from "./furnitureSlice"

const API_URL = "https://react-crud-furniturestore.onrender.com";

export async function fetchFurnitures() {
    return fetch(`${API_URL}/furnitures.json`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log("Error: ", error);
            return {} as FurnituresState
        })
}

export async function createFurniture(payload: FurnitureFormData) {
    const furniture = payload.furniture;
    return fetch(`${API_URL}/furnitures.json`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            furniture
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log("Error: ", error);
            return {} as FurnituresState
        })
}
export async function updateFurniture(payload: FurnitureFormData) {
    const furniture = payload.furniture;
    return fetch(`${API_URL}/furnitures/${furniture.id}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        furniture
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as FurnituresState;
      });
  }
  
  export async function destroyFurniture(payload: FurnitureDeleteData) {
    const furniture = payload.furniture;
    return fetch(`${API_URL}/furnitures/${furniture.furniture_id}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        furniture,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("Error: ", error);
        return {} as FurnituresState;
      });
  }