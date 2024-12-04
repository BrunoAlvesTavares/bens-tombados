import { PartialType } from '@nestjs/mapped-types';
import { CreateSubclasseDto } from './create-subclasse.dto';

export class UpdateSubclasseDto extends PartialType(CreateSubclasseDto) {}
