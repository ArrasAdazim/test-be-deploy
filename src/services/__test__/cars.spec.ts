import CarsRepository from "../../repositories/cars";
import CarsService from "../cars";
// import { mocked } from "jest-mock";


jest.mock("../../../config/cloudinary");

describe("getTweetByID", () => {
  it("should return correct car data", async () => {
    const expectedTweetResponse = {
      id: 1,
      nama: "CARS Sample",
      sewa: "Rp.100.000",
      ukuran: "Large",
      foto: "google.jpg",
      user: {
        id: 0,
        name: "Test",
        email: "test@gmail.com",
        profile_picture_file: undefined,
      },
    };

    /** creating dependency of use case */
    const mockCarsRepository = new CarsRepository();

    /** mocking needed function */
    mockCarsRepository.getCarByID = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedTweetResponse));

    const carsService = new CarsService(mockCarsRepository);

    const car = await carsService.getTweetByID(1);

    expect(car).toEqual(expectedTweetResponse);
  });
});


describe("getCars", () => {
  it("should return correct list of car data", async () => {
    const expectedCarsResponse = [
      {
        id: 1,
        nama: "CARS Sample 1",
        sewa: "Rp.100.000",
        ukuran: "Large",
        foto: "google1.jpg",
        user: {
          id: 1,
          name: "Test1",
          email: "test1@gmail.com",
          profile_picture_file: undefined,
        },
      },
      {
        id: 2,
        nama: "CARS Sample 2",
        sewa: "Rp.150.000",
        ukuran: "Medium",
        foto: "google2.jpg",
        user: {
          id: 2,
          name: "Test2",
          email: "test2@gmail.com",
          profile_picture_file: undefined,
        },
      },
      {
        id: 3,
        nama: "CARS Sample 3",
        sewa: "Rp.150.000",
        ukuran: "Small",
        foto: "google2.jpg",
        user: {
          id: 2,
          name: "Test2",
          email: "test2@gmail.com",
          profile_picture_file: undefined,
        },
      },
    ];

    /** creating dependency of use case */
    const mockCarsRepository = new CarsRepository();

    /** mocking needed function */
    mockCarsRepository.getCars = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCarsResponse));

    const carsService = new CarsService(mockCarsRepository);

    const cars = await carsService.getCars();

    expect(cars).toEqual(expectedCarsResponse);
  });
});


// describe("createCar", () => {
//   it("should create a new car and return the created car data", async () => {
//     // Mocking input data
//     const carToCreate = {
//       nama: "Test Car",
//       sewa: "Rp. 200.000",
//       ukuran: "Medium",
//       // Menggunakan fungsi createMockFile untuk membuat objek Express.Multer.File
//       foto: createMockFile({
//         buffer: Buffer.from("test image content"),
//         mimetype: "image/jpeg",
//         size: 100, // Sesuaikan dengan kebutuhan
//         originalname: "test.jpg", // Sesuaikan dengan kebutuhan
//         fieldname: "foto", // Sesuaikan dengan kebutuhan
//         encoding: "7bit", // Sesuaikan dengan kebutuhan
//       }),
//       user_id: 1,
//     };

//     // Mocking the expected created car response
//     const expectedCreatedCar = {
//       id: 1,
//       nama: carToCreate.nama,
//       sewa: carToCreate.sewa,
//       ukuran: carToCreate.ukuran,
//       // Menggunakan teks sebagai URL foto
//       foto: "test_image_url",
//       created_at: new Date(),
//       updated_at: new Date(),
//       user: {
//         id: carToCreate.user_id,
//         name: "Test User",
//         email: "testuser@example.com",
//         profile_picture_file: "test_profile_picture_url",
//       },
//     };

//     // Creating a mock CarsRepository
//     const mockCarsRepository = new CarsRepository();

//     // Mocking the implementation of createCar method in CarsRepository
//     mocked(mockCarsRepository.createCar).mockImplementation(() =>
//       Promise.resolve(expectedCreatedCar)
//     );

//     // Creating CarsService with the mocked CarsRepository
//     const carsService = new CarsService(mockCarsRepository);

//     // Calling createCar method
//     const createdCar = await carsService.createCar(carToCreate);

//     // Asserting the result
//     expect(createdCar).toEqual(expectedCreatedCar);
//   });
// });


// function createMockFile(data: any) {
//   return data as Express.Multer.File;
// }