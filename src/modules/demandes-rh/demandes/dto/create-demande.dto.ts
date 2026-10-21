import { IsNotEmpty, IsString, IsDateString, IsBoolean, IsOptional, IsNumber } from "class-validator";

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
}

