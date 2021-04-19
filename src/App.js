import React from "react";
import VehicleStore from "./VehicleStore"
import VehicleMakeList from "./components/VehicleMakeList";
import VehicleModelList from "./components/VehicleModelList";



const App = () => {
  const store = new VehicleStore();
  return (
      <div className="App">
        <h3>Vehicle List</h3>
        <VehicleMakeList store={store} />
        <hr />
        <hr />
        <h3>Owner List</h3>

        <VehicleModelList store={store} />
      </div>
  )
}

export default App