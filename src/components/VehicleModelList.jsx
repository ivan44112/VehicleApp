import { observer } from "mobx-react-lite";
import React from "react";

const VehicleModelList = ({ store }) => {
    const handleAddVehicleModel = () => {
        const name = prompt("Name?");
        const type = prompt("Type?");
        store.createVehicleModel({ id: Math.random(), name, type });
    };

    const handleUpdateVehicleModel = (vehicleModel) => {
        vehicleModel.name = prompt("Name?", vehicleModel.name);
        vehicleModel.type = prompt("Type?", vehicleModel.type);
        store.updateVehicleModel(vehicleModel.id, vehicleModel);
    };

    const handleDeleteVehicleModel = (vehicleModel) => {
        store.deleteVehicleModel(vehicleModel.id);
    };

    return (
        <div className="vehicle-model">
            <table>
                <thead>
                <tr>
                    <th>##</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {store.vehicleModels.map((vehicleModel) => {
                    return (
                        <tr key={vehicleModel.id}>
                            <td>{vehicleModel.id}</td>
                            <td>{vehicleModel.name}</td>
                            <td>{vehicleModel.type}</td>
                            <td>
                                <button
                                    onClick={() => handleDeleteVehicleModel(vehicleModel)}
                                    style={{ marginRight: "1rem" }}
                                >
                                    Delete {vehicleModel.name}
                                </button>
                                <button onClick={() => handleUpdateVehicleModel(vehicleModel)}>
                                    Update {vehicleModel.name}
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button onClick={handleAddVehicleModel}>+ New Vehicle Model</button>
        </div>
    );
}

export default observer(VehicleModelList);