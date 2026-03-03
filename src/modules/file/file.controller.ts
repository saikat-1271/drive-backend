import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { CreateDocumentRevisionDto } from './dto/create-document-revision.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DocumentListQueryDto } from './dto/document-list-query.dto';

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new file' })
  @ApiResponse({ status: 201, description: 'File created successfully.' })
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  @ApiResponse({ status: 200, description: 'List of files.' })
  findAll(@Query() query: DocumentListQueryDto) {
    return this.fileService.getDocumentList(query);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiResponse({ status: 200, description: 'File found.' })
  @ApiResponse({ status: 404, description: 'File not found.' })
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a file' })
  @ApiResponse({ status: 200, description: 'File updated successfully.' })
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file' })
  @ApiResponse({ status: 200, description: 'File deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }

  @Post('document-revision')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Save document revision' })
  @ApiResponse({
    status: 201,
    description: 'Document revision saved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  saveDocumentRevision(
    @Body() createDocumentRevisionDto: CreateDocumentRevisionDto,
  ) {
    return this.fileService.saveDocumentRevision(createDocumentRevisionDto);
  }
}
