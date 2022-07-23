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
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { NotFoundSwagger } from '../../helpers/swagger/notFound.swagger';
import { BadRequestSwagger } from '../../helpers/swagger/badRequest.swagger';
@ApiTags('patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient' })
  @ApiResponse({
    status: 201,
    description: 'New patient',
  })
  @ApiResponse({
    status: 400,
    description: 'params invalid',
    type: BadRequestSwagger,
  })
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientService.create(createPatientDto);
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
    return await this.patientService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'List one patient',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient listed',
  })
  @ApiResponse({
    status: 404,
    description: 'Patient not found',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(id);
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
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientService.update(id, updatePatientDto);
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
    return await this.patientService.remove(id);
  }
}
