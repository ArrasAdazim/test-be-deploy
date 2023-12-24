import { CarRequest, CarResponse } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";
import cloudinary from "../../config/cloudinary";

class CarsService {
  _carsRepository: CarsRepository;

  constructor(carsRepository: CarsRepository) {
    this._carsRepository = carsRepository;
  }

   async getCars(): Promise<CarResponse[]> {
    const listCars = await this._carsRepository.getCars();

    const listCarsResponse: CarResponse[] = listCars.map((car) => {
      const carResponse: CarResponse = {
        id: car.id as number,
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: car.foto,
        created_at: car.created_at,
        updated_at: car.updated_at,
        user: {
          id: car.user?.id as number,
          name: car.user?.name as string,
          email: car.user?.email as string,
          profile_picture_file: car.user?.profile_picture_url as string,
        },
      };

      return carResponse;
    });

    return listCarsResponse;
  }

  async getTweetByID(id: number): Promise<CarResponse> {
    const car = await this._carsRepository.getCarByID(id);

    let carResponse: CarResponse = {
      id: 0,
      nama: "",
      sewa: "",
      ukuran: "",
      foto: "",
      user: {
        id: 0,
        name: "",
        email: "",
        profile_picture_file: "",
      },
    };

    if (car !== null) {
      carResponse = {
        id: car.id as number,
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: car.foto,
        user: {
          id: car.user?.id as number,
          name: car.user?.name as string,
          email: car.user?.email as string,
          profile_picture_file: car.user?.profile_picture_url as string,
        },
      };
    }

    return carResponse;
  }

  async createCar(car: CarRequest): Promise<Car> {
    const fileBase64 = car.foto?.buffer.toString("base64");
    const file = `data:${car.foto?.mimetype};base64,${fileBase64}`;

    const uploadedFileImage = await cloudinary.uploader.upload(file);

    const carToCreate: Car = {
      nama: car.nama,
      sewa: car.sewa,
      ukuran: car.ukuran,
      foto: uploadedFileImage.url,
      user_id: car.user_id,
    };
    const createdCar = await this._carsRepository.createCar(carToCreate);

    return createdCar;
  }

  async deleteCar(car_id: number, deleted_by: number): Promise<Car | null> {
    const deletedCar = await this._carsRepository.deleteCar(car_id, deleted_by);
    return deletedCar;
  }

  async updateCar(car_id: number, car: CarRequest): Promise<Car | null> {
    const fileBase64 = car.foto?.buffer.toString("base64");
    const file = `data:${car.foto?.mimetype};base64,${fileBase64}`;

    const uploadedImage = await cloudinary.uploader.upload(file);

    const carToUpdate: Car = {
      nama: car.nama,
      sewa: car.sewa,
      ukuran: car.ukuran,
      foto: uploadedImage.url,
      updated_by: car.updated_by,
      updated_at: car.updated_at,
    };
    const updatedCar = await this._carsRepository.updateCar(
      car_id,
      carToUpdate
    );
    return updatedCar;
  }
}

export default CarsService;
