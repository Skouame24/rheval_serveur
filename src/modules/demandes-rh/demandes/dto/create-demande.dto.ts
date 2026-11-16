import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateDemandeDto {
  @IsString()
  @IsNotEmpty()
  typeCode: string;

  @IsDateString()
  @IsNotEmpty()
  dateDebut: string;

  @IsDateString()
  @IsNotEmpty()
  dateFin: string;

  @IsBoolean()
  @IsOptional()
  demiJourneeDebut?: boolean;

  @IsBoolean()
  @IsOptional()
  demiJourneeFin?: boolean;

  @IsString()
  @IsNotEmpty()
  motif: string;

  @IsString()
  @IsOptional()
  destination?: string;

  @IsString()
  @IsOptional()
  moyenTransport?: string;

  @IsNumber()
  @IsOptional()
  fraisEstimes?: number;

  @IsString()
  @IsOptional()
  ordreDonneAId?: string;

  @IsString()
  @IsOptional()
  clientProjet?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  tarifInterventionJour?: number;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsOptional()
  equipeInterventionIds?: string[];
}

