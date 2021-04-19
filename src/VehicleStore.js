import {
    action,
    computed,
    makeObservable,
    observable,
    autorun,
    runInAction,
} from "mobx";

class VehicleStore {
    vehicleMakes = [];
    vehicleModels = [];

    constructor() {
        makeObservable(this, {
            vehicleMakes: observable,
            vehicleModels: observable,
            totalVehicleModels: computed,
            totalVehicleMakes: computed,
            storeDetails: computed,
            createVehicleMake: action,
            createVehicleModel: action,
            updateVehicleMake: action,
            updateVehicleModel: action,
            deleteVehicleMake: action,
            deleteVehicleModel: action,
            assignVehicleModelToVehicleMake: action,
        });
        autorun(this.logStoreDetails);
        runInAction(this.prefetchData);
    }


    get totalVehicleModels() {
        return this.vehicleModels.length;
    }


    get totalVehicleMakes() {
        return this.vehicleMakes.length;
    }

    get filteredVehicleModels() {
        let filteredList = this.vehicleModels.filter(item =>
        item.name.toLowerCase());
        if (filteredList.length) return filteredList;
        return this.vehicleModels
    }



    createVehicleMake(vehicleMake = { id: 0, name: "", color: "", vehicleModel: null }) {
        this.vehicleMakes.push(vehicleMake);
        return vehicleMake;
    }

    createVehicleModel(vehicleModel = { id: 0, name: "", type: "" }) {
        this.vehicleModels.push(vehicleModel);
        return vehicleModel;
    }

    updateVehicleModel(vehicleModelId, update) {
        const vehicleModelIndexAtId = this.vehicleModels.findIndex(
            (vehicleModel) => vehicleModel.id === vehicleModelId
        );
        if (vehicleModelIndexAtId > -1 && update) {
            this.vehicleModels[vehicleModelIndexAtId] = update;
            return this.vehicleModels[vehicleModelIndexAtId];
        }
    }

    updateVehicleMake(vehicleMakeId, update) {
        const vehicleMakeIndexAtId = this.vehicleMakes.findIndex((vehicleMake) => vehicleMake.id === vehicleMakeId);
        if (vehicleMakeIndexAtId > -1 && update) {
            this.vehicleMakes[vehicleMakeIndexAtId] = update;
            return this.vehicleMakes[vehicleMakeIndexAtId];
        }
    }

    deleteVehicleMake(vehicleMakeId) {
        const vehicleMakeIndexAtId = this.vehicleMakes.findIndex((vehicleMake) => vehicleMake.id === vehicleMakeId);
        if (vehicleMakeIndexAtId > -1) {
            this.vehicleMakes.splice(vehicleMakeIndexAtId, 1);
        }
    }

    deleteVehicleModel(vehicleModelId) {
        const vehicleModelIndexAtId = this.vehicleModels.findIndex(
            (vehicleModel) => vehicleModel.id === vehicleModelId
        );
        if (vehicleModelIndexAtId > -1) {
            this.vehicleModels.splice(vehicleModelIndexAtId, 1);

            this.vehicleMakes = this.vehicleMakes.map((vehicleMake) => {
                if (vehicleMake.vehicleModel && vehicleMake.vehicleModel.id === vehicleModelId) {
                    vehicleMake.vehicleModel = null;
                }
                return vehicleMake;
            });
        }
    }

    assignVehicleModelToVehicleMake(vehicleModelId, vehicleMakeId) {
        const vehicleMakeAtIndex = this.vehicleMakes.find(
            (vehicleMake) => parseInt(vehicleMake.id) === parseInt(vehicleMakeId)
        );
        const vehicleModelAtIndex = this.vehicleModels.find(
            (vehicleModel) => parseInt(vehicleModel.id) === parseInt(vehicleModelId)
        );
        if (vehicleMakeAtIndex && vehicleModelAtIndex) {
            vehicleMakeAtIndex.vehicleModel = vehicleModelAtIndex;
        }
    }

    get storeDetails() {
        return `We have ${this.totalVehicleMakes} vehicles and ${this.totalVehicleModels} models.`;
    }

    logStoreDetails = () => {
        console.log(this.storeDetails);
    };

    prefetchData = () => {
        const vehicleModels = [{ name: "Supra", type: "race-car", id: 1 }];
        const vehicleMakes = [
            {
                id: 1,
                name: "Toyota",
                color: "Red",
                vehicleModelId: 1,
            },
        ];

        setTimeout(() => {
            console.log("Fetch complete update store");
            vehicleModels.map((vehicleMake) => this.createVehicleModel(vehicleMake));
            vehicleMakes.map((vehicleMake) => {
                this.createVehicleMake(vehicleMake);
                this.assignVehicleModelToVehicleMake(vehicleMake.vehicleModelId, vehicleMake.id);
                return vehicleMake;
            });
        }, 3000);
    };
}

export default VehicleStore;