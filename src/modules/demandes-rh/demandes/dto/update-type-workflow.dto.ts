import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateTypeWorkflowDto {
  @IsOptional()
  @IsBoolean()
  workflowN1?: boolean;

  @IsOptional()
  @IsBoolean()
  workflowDrh?: boolean;

  @IsOptional()
  @IsBoolean()
  workflowDg?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  seuilDgJours?: number;

  @IsOptional()
  @IsBoolean()
  pieceRequise?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  delaiMinJours?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  dureeMaxJours?: number;

  @IsOptional()
  @IsString()
  libelle?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

