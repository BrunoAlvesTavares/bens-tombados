import { PartialType } from '@nestjs/mapped-types';
import { CreateLivroTomboDto } from './create-livro-tombo.dto';

export class UpdateLivroTomboDto extends PartialType(CreateLivroTomboDto) {}
