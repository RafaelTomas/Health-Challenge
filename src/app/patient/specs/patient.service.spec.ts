import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreatePatientRequestDto } from '../dto/create-patient.dto';
import { UpdatePatientRequestDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entitys';
import { PatientService } from '../patient.service';

const mockPatientList = [
  {
    _id: '62d9f3825f0d1644146cfe54',
    name: 'test 1',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  },
  {
    _id: '62d9f3825f0d1644146cfe55',
    name: 'test 2',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  },
  {
    _id: '62d9f3825f0d1644146cfe56',
    name: 'test 3',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  },
];

const MockPatientModel = {
  save: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
};

describe('PatientService', () => {
  let service: PatientService;
  let model: Model<Patient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getModelToken(Patient.name),
          useValue: MockPatientModel,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    model = module.get<Model<Patient>>(getModelToken(Patient.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('list', () => {
    it('should return patient list successfully', async () => {
      MockPatientModel.find.mockResolvedValueOnce(mockPatientList);

      const response = await service.findAll();

      expect(response).toEqual(mockPatientList);
      expect(MockPatientModel.find).toHaveBeenCalledTimes(1);
    });

    it('should bring in case of error', async () => {
      MockPatientModel.find.mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrowError();
    });
  });

  // describe('create', () => {
  //   it('should return new patient successfully', async () => {
  //     const body: CreatePatientRequestDto = {
  //       name: 'create',
  //       healthInsuranceCardId: '123465789',
  //       address: 'somewhere',
  //       createdAt: '9999-99-99',
  //     };

  //     const expectedResponse = {
  //       _id: '62d89eebd3d10a16f5906ff4',
  //       name: 'create',
  //       healthInsuranceCardId: '123465789',
  //       address: 'somewhere',
  //       createdAt: '9999-99-99',
  //     };

  //     MockPatientModel.save.mockResolvedValueOnce(expectedResponse);

  //     const result = await service.create(body);

  //     expect(result).toEqual(expectedResponse);
  //     expect(service.create).toHaveBeenCalledTimes(1);
  //     expect(service.create).toHaveBeenCalledWith(body);
  //   });

  //   it('should bring in case of error', () => {
  //     const body: CreatePatientRequestDto = {
  //       name: 'create',
  //       healthInsuranceCardId: '123465789',
  //       address: 'somewhere',
  //       createdAt: '9999-99-99',
  //     };

  //     MockPatientModel.save.mockRejectedValueOnce(new Error());

  //     expect(service.create(body)).rejects.toThrowError();
  //   });
  // });

  // describe('list one', () => {
  //   it('should return one patient list successfully', async () => {
  //     MockPatientModel.find.mockResolvedValueOnce(mockPatientList[0]);

  //     const response = await service.findOne('62d9f3825f0d1644146cfe54');

  //     expect(response).toBeDefined();
  //     expect(service.findOne).toHaveBeenCalledTimes(1);
  //     expect(service.findOne).toHaveBeenCalledWith('62d9f3825f0d1644146cfe54');
  //   });

  //   it('should bring in case of error', () => {
  //     MockPatientModel.find.mockRejectedValueOnce(new Error());

  //     expect(
  //       service.findOne('62d9f3825f0d1644146cfe54'),
  //     ).rejects.toThrowError();
  //   });
  // });

  // describe('update', () => {
  //   it('should return patient update successfully', async () => {
  //     const body: UpdatePatientRequestDto = {
  //       name: 'update',
  //       healthInsuranceCardId: '123465789',
  //       address: 'somewhere',
  //       createdAt: '9999-99-99',
  //     };

  //     const expectedResponse = {};
  //     MockPatientModel.findByIdAndUpdate.mockResolvedValue(expectedResponse);

  //     const response = await service.update('62d9f3825f0d1644146cfe54', body);

  //     expect(response).toEqual(expectedResponse);
  //     expect(service.update).toHaveBeenCalledTimes(1);
  //     expect(service.update).toHaveBeenCalledWith(
  //       '62d9f3825f0d1644146cfe54',
  //       body,
  //     );
  //   });

  //   it('should bring in case of error', () => {
  //     const body: UpdatePatientRequestDto = {
  //       name: 'update',
  //       healthInsuranceCardId: '123465789',
  //       address: 'somewhere',
  //       createdAt: '9999-99-99',
  //     };

  //     MockPatientModel.findByIdAndUpdate.mockRejectedValueOnce(new Error());

  //     expect(
  //       service.update('62d9f3825f0d1644146cfe54', body),
  //     ).rejects.toThrowError();
  //   });
  // });

  describe('remove', () => {
    it('should return patient remove successfully', async () => {
      const response = await service.remove('62d9f3825f0d1644146cfe54');

      expect(response).toBeUndefined();
      expect(MockPatientModel.deleteOne).toBeCalledWith({
        _id: '62d9f3825f0d1644146cfe54',
      });
    });

    it('should bring in case of error', () => {
      MockPatientModel.deleteOne.mockRejectedValueOnce(new Error());

      expect(service.remove('62d9f3825f0d1644146cfe54')).rejects.toThrowError();
    });
  });
});
