import { PartialType } from '@nestjs/mapped-types';
import { CreateOnTopDto } from './create-on-top.dto';

export class UpdateOnTopDto extends PartialType(CreateOnTopDto) {}
