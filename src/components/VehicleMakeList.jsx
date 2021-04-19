import React from "react";
import { observer } from "mobx-react-lite";

const VehicleMakeList = ({ store }) => {
    const handleAddVehicleMake = () => {
        const name = prompt("Name of the vehicle");
        const color = prompt("Color of the vehicle");
        const vehicleModelId = prompt("Vehicle model's Id of the vehicle");

        const vehicleMake = store.createVehicleMake({ id: Math.random(), name, color });
        store.assignVehicleModelToVehicleMake(vehicleModelId, vehicleMake.id);
    };

    const handleUpdateVehicleMake = (vehicleMake) => {
        vehicleMake.name = prompt("Name of the vehicle", vehicleMake.name);
        vehicleMake.color = prompt("Color of the vehicle", vehicleMake.color);
        const vehicleModelId = prompt("Vehicle model's Id of the vehicle", vehicleMake.vehicleModel?.id);
        store.updateVehicleMake(vehicleMake.id, vehicleMake);
        if (vehicleModelId !== vehicleMake.vehicleModel?.id) {
            store.assignVehicleModelToVehicleMake(vehicleModelId, vehicleMake.id);
        }
    };

    const handleDeleteVehicleMake = (vehicleMake) => {
        store.deleteVehicleMake(vehicleMake.id);
    };

    return (
        <div>
            <p>{store.storeDetails}</p>
            <table>
                <thead>
                <tr>
                    <th>##</th>
                    <th>Vehicle Name</th>
                    <th>Color</th>
                    <th>Vehicle Model</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {store.vehicleMakes.map((vehicleMake) => {
                    return (
                        <tr key={vehicleMake.id}>
                            <td>{vehicleMake.id}</td>
                            <td>{vehicleMake.name}</td>
                            <td>{vehicleMake.color}</td>
                            <td>
                                {vehicleMake.vehicleModel
                                    ? `${vehicleMake.vehicleModel?.name} ${vehicleMake.vehicleModel?.type}`
                                    : "---"}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDeleteVehicleMake(vehicleMake)}
                                    style={{ marginRight: "1rem" }}
                                >
                                    Delete {vehicleMake.name}
                                </button>
                                <button onClick={() => handleUpdateVehicleMake(vehicleMake)}>
                                    Update {vehicleMake.name}
                                </button>

                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button onClick={handleAddVehicleMake}>+ New vehicle</button>
        </div>
    );
}

export default observer(VehicleMakeList);