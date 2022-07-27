import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientRequestDto } from '../dto/create-patient.dto';
import { UpdatePatientRequestDto } from '../dto/update-patient.dto';
import { PatientController } from '../patient.controller';
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

const MockPatientService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PatientController', () => {
  let patientController: PatientController;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: MockPatientService,
        },
      ],
    }).compile();

    patientController = module.get<PatientController>(PatientController);
    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(patientController).toBeDefined();
    expect(patientService).toBeDefined();
  });

  describe('create', () => {
    it('should return new patient successfully', async () => {
      const body: CreatePatientRequestDto = {
        name: 'create',
        healthInsuranceCardId: '123465789',
        address: 'somewhere',
        createdAt: '9999-99-99',
      };

      const expectedResponse = {
        _id: '62d89eebd3d10a16f5906ff4',
        name: 'create',
        healthInsuranceCardId: '123465789',
        address: 'somewhere',
        createdAt: '9999-99-99',
      };
      MockPatientService.create.mockResolvedValueOnce(expectedResponse);

      const result = await patientController.create(body);

      expect(result).toEqual(expectedResponse);
      expect(patientService.create).toHaveBeenCalledTimes(1);
      expect(patientService.create).toHaveBeenCalledWith(body);
    });

    it('should bring in case of error', () => {
      const body: CreatePatientRequestDto = {
        name: 'create',
        healthInsuranceCardId: '123465789',
        address: 'somewhere',
        createdAt: '9999-99-99',
      };

      MockPatientService.create.mockRejectedValueOnce(new Error());

      expect(patientController.create(body)).rejects.toThrowError();
    });
  });

  describe('list', () => {
    it('should return patient list successfully', async () => {
      MockPatientService.findAll.mockResolvedValueOnce(mockPatientList);

      const response = await patientController.findAll();

      expect(response).toEqual(mockPatientList);
      expect(patientService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should bring in case of error', async () => {
      MockPatientService.findAll.mockRejectedValueOnce(new Error());

      await expect(patientController.findAll()).rejects.toThrowError();
    });
  });

  describe('list one', () => {
    it('should return one patient list successfully', async () => {
      MockPatientService.findOne.mockResolvedValueOnce(mockPatientList[0]);

      const response = await patientController.findOne(
        '62d9f3825f0d1644146cfe54',
      );

      expect(response).toEqual(mockPatientList[0]);
      expect(patientService.findOne).toHaveBeenCalledTimes(1);
      expect(patientService.findOne).toHaveBeenCalledWith(
        '62d9f3825f0d1644146cfe54',
      );
    });

    it('should bring in case of error', () => {
      MockPatientService.findOne.mockRejectedValueOnce(new Error());

      expect(
        patientController.findOne('62d9f3825f0d1644146cfe54'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return patient update successfully', async () => {
      const body: UpdatePatientRequestDto = {
        name: 'update',
        healthInsuranceCardId: '123465789',
        address: 'somewhere',
        createdAt: '9999-99-99',
      };

      const expectedResponse = {};
      MockPatientService.update.mockResolvedValue(expectedResponse);

      const response = await patientController.update(
        '62d9f3825f0d1644146cfe54',
        body,
      );

      expect(response).toEqual(expectedResponse);
      expect(patientService.update).toHaveBeenCalledTimes(1);
      expect(patientService.update).toHaveBeenCalledWith(
        '62d9f3825f0d1644146cfe54',
        body,
      );
    });

    it('should bring in case of error', () => {
      const body: UpdatePatientRequestDto = {
        name: 'update',
        healthInsuranceCardId: '123465789',
        address: 'somewhere',
        createdAt: '9999-99-99',
      };

      MockPatientService.update.mockRejectedValueOnce(new Error());

      expect(
        patientController.update('62d9f3825f0d1644146cfe54', body),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should return patient remove successfully', async () => {
      const idToRemove = '62d9f3825f0d1644146cfe54';
      const response = await patientController.remove(idToRemove);

      expect(response).toBeUndefined();
      expect(MockPatientService.remove).toHaveBeenCalledWith(idToRemove);
    });

    it('should bring in case of error', () => {
      MockPatientService.remove.mockRejectedValueOnce(new Error());

      expect(
        patientController.remove('62d9f3825f0d1644146cfe54'),
      ).rejects.toThrowError();
    });
  });
});
