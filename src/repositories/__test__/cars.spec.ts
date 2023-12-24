import { Car } from "../../models/entity/car";
import CarsRepository from "../cars";

describe("getCarByID", () => {
  it("Should return a car data", async () => {
    const carsRepository = new CarsRepository();

    const carToCreate: Car = {
      nama: "test cars",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "google.jpg",
      user_id: 1,
    };
    const createdCar = await carsRepository.createCar(carToCreate);

    const getCars = await carsRepository.getCarByID(createdCar.id as number);

    await carsRepository.deleteCarByID(createdCar.id as number);

    // Assertion
    expect(getCars?.id).toEqual(createdCar.id);
    expect(getCars?.nama).toEqual(carToCreate.nama);
    expect(getCars?.sewa).toEqual(carToCreate.sewa);
    expect(getCars?.ukuran).toEqual(carToCreate.ukuran);
    expect(getCars?.foto).toEqual(carToCreate.foto);
  });
});

describe("createCar", () => {
  it("Should create a new data car and return the created car data", async () => {
    const carsRepository = new CarsRepository();

    // Data for the Car to be created
    const carToCreate: Car = {
      nama: "test cars",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "google.jpg",
      user_id: 1,
    };
    const createdCar = await carsRepository.createCar(carToCreate);

    // Cleanup: Delete the created tweet
    await carsRepository.deleteCarByID(createdCar.id as number);

    // Assertion
    expect(createdCar).toBeDefined();
    expect(createdCar?.id).toEqual(createdCar.id);
    expect(createdCar?.nama).toEqual(carToCreate.nama);
    expect(createdCar?.sewa).toEqual(carToCreate.sewa);
    expect(createdCar?.ukuran).toEqual(carToCreate.ukuran);
    expect(createdCar?.foto).toEqual(carToCreate.foto);
  });
});

describe("deleteCarByID", () => {
  it("Should delete a car data by ID", async () => {
    const carsRepository = new CarsRepository();

    // Data for the Car to be created
    const carToCreate: Car = {
      nama: "DELETED cars",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "google.jpg",
      user_id: 1,
    };
    const createdCar = await carsRepository.createCar(carToCreate);

    expect(createdCar).toBeDefined();

    // Delete the created car
    await carsRepository.deleteCarByID(createdCar.id as number);
    const deletedCar = await carsRepository.getCarByID(createdCar.id as number);

    // Assertion
    expect(deletedCar).toBeNull();
  });
});
describe("Upated CAR", () => {
  it("Should update an data car", async () => {
    const carsRepository = new CarsRepository();

    // Create Data Car
    const carToCreate: Car = {
      nama: "CREATE cars",
      sewa: "Rp. 100.000",
      ukuran: "Large",
      foto: "google.jpg",
      user_id: 1,
    };

    const createdCar = await carsRepository.createCar(carToCreate);

    // Update Data Car
    const updatedCarData: Car = {
      nama: "UPDATE cars",
      sewa: "Rp. 100.000",
      ukuran: "Small",
      foto: "google.jpg",
      updated_by: 2,
    };

    const updatedCar = await carsRepository.updateCar(
      createdCar.id as number,
      updatedCarData
    );
    const fetchedUpdatedCar = await carsRepository.getCarByID(
      createdCar.id as number
    );

    // Assertion
    expect(fetchedUpdatedCar).toBeDefined();
    expect(fetchedUpdatedCar?.id).toEqual(createdCar.id);
    expect(fetchedUpdatedCar?.nama).toEqual(updatedCarData.nama);
    expect(fetchedUpdatedCar?.sewa).toEqual(updatedCarData.sewa);
    expect(fetchedUpdatedCar?.ukuran).toEqual(updatedCarData.ukuran);
    expect(fetchedUpdatedCar?.foto).toEqual(updatedCarData.foto);

    
    await carsRepository.deleteCar(updatedCar?.id as number, 2);
  });
});

// describe("deleteCar", () => {
//   it("Should delete a car data by ID with deleted_by", async () => {
//     const carsRepository = new CarsRepository();

//     // Data for the Car to be created
//     const carToCreate: Car = {
//       nama: "test cars",
//       sewa: "createdCar",
//       ukuran: "Large",
//       foto: "google.jpg",
//       user_id: 1,
//     };
//     const createdCar = await carsRepository.createCar(carToCreate);

//     // Log the car before deletion
//     console.log("Before deletion:", createdCar);

//     // Delete the created car with deleted_by
//     const deletedCar = await carsRepository.deleteCar(
//       createdCar.id as number,
//       1
//     );

//     // Log the car after deletion
//     console.log("After deletion:", deletedCar);

//     // Assertion
//     expect(deletedCar?.deleted_by).toEqual(1);

//     // Try to get the deleted car
//     const fetchedDeletedCar = await carsRepository.getCarByID(
//       createdCar.id as number
//     );

//     // Assertion
//     expect(fetchedDeletedCar).toBeNull();
//   });
// });
