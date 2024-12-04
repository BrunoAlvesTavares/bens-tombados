import { PartialType } from '@nestjs/mapped-types';
import { CreateAtoLegalDto } from './create-ato-legal.dto';

export class UpdateAtoLegalDto extends PartialType(CreateAtoLegalDto) {}
