import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class AjusterSoldeDto {
  @IsNumber()
  @IsNotEmpty()
  joursAcquis: number;

  @IsNumber()
  @IsOptional()
  reliquatN1?: number;

  @IsString()
  @IsNotEmpty()
  motif: string;
}

