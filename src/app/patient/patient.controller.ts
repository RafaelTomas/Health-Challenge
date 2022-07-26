import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import {
  CreatePatientRequestDto,
  CreatePatientResponseDto,
} from './dto/create-patient.dto';
import { UpdatePatientRequestDto } from './dto/update-patient.dto';
import { NotFoundSwagger } from '../../helpers/swagger/notFound.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/badRequest.swagger';
import { PatientResponseDto } from './dto/patient.dto';
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient' })
  @ApiResponse({
    status: 201,
    type: CreatePatientResponseDto,
  })
  async create(@Body() body: CreatePatientRequestDto) {
    const patient = this.patientService.create(body);
    return patient;
  }

  @Get()
  @ApiOperation({
    summary: 'List all patient',
  })
  @ApiResponse({
    status: 200,
    description: 'All patient',
  })
  async findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'List one patient',
  })
  @ApiResponse({
    status: 200,
    type: PatientResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(id);
    return patient;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update patient',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'params invalid',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientRequestDto,
  ) {
    const patient = await this.patientService.update(id, updatePatientDto);
    return patient;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove patient',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully removed ',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
    type: NotFoundSwagger,
  })
  async remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
