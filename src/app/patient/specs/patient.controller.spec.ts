import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientRequestDto } from '../dto/create-patient.dto';
import { Patient } from '../entities/patient.entity';
import { PatientController } from '../patient.controller';
import { PatientService } from '../patient.service';

const newPatient = new Patient({
  name: 'create',
  healthInsuranceCardId: '123465789',
  address: 'somewhere',
  createdAt: '9999-99-99',
});

const patientList: Patient[] = [
  new Patient({
    name: 'test 1',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  }),
  new Patient({
    name: 'test 2',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  }),
  new Patient({
    name: 'test 3',
    healthInsuranceCardId: '123465789',
    address: 'somewhere',
    createdAt: '9999-99-99',
  }),
];

const updatedPatient = new Patient({
  name: 'update',
  healthInsuranceCardId: '123465789',
  address: 'somewhere',
  createdAt: '9999-99-99',
});

describe('PatientController', () => {
  let patientController: PatientController;
  let patientService: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn().mockResolvedValue(newPatient),
            findAll: jest.fn().mockResolvedValue(patientList),
            findOne: jest.fn().mockResolvedValue(patientList[0]),
            update: jest.fn().mockResolvedValue(updatedPatient),
            remove: jest.fn().mockResolvedValue(undefined),
          },
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

      const result = await patientController.create(body);

      expect(result).toEqual(newPatient);
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
      jest.spyOn(patientService, 'create').mockRejectedValueOnce(new Error());

      expect(patientController.create(body)).rejects.toThrowError();
    });
  });

  describe('list', () => {
    it('should return patient list successfully', async () => {
      const result = await patientController.findAll();

      expect(result).toEqual(patientList);
      expect(typeof result).toEqual('object');
      expect(patientService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should bring in case of error', () => {
      jest.spyOn(patientService, 'findAll').mockRejectedValueOnce(new Error());

      expect(patientController.findAll()).rejects.toThrowError();
    });
  });
});
