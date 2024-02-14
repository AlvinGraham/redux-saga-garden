import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlantList() {
  const dispatch = useDispatch();

  const reduxState = useSelector((store) => store);
  // console.log("reduxState:", reduxState.plantList, reduxState.length);

  const deleteBtn = (event, id) => {
    dispatch({ type: "DELETE_PLANT", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_PLANTS" });
  }, []);

  return (
    <div>
      <h3>This is the plant list</h3>
      {reduxState.plantList.length > 0 &&
        reduxState.plantList.map((plant) => {
          return (
            <div key={plant.id}>
              <p>
                {plant.name}{" "}
                <button
                  type="button"
                  onClick={() => {
                    deleteBtn(event, plant.id);
                  }}>
                  Delete
                </button>
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default PlantList;
