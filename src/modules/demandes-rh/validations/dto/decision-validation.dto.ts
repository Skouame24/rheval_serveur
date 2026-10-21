import { IsNotEmpty, IsString, IsIn, IsOptional } from "class-validator";
import { DecisionValidation } from "../../constants/statuts-demande.constant";

export class DecisionValidationDto {
  @IsString()
  @IsIn([DecisionValidation.APPROUVE, DecisionValidation.RETOURNE, DecisionValidation.REFUSE])
  decision: DecisionValidation;

  @IsString()
  @IsOptional()
  motif?: string;
}

