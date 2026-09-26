import {
    IsDateString,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
export class CreateComputerDto {
    @IsString() @MinLength(1) @MaxLength(255) serialNumber!: string;
    @IsString() @MinLength(1) @MaxLength(100) machineType!: string;
    @IsString() @MinLength(1) @MaxLength(255) office!: string;
    @IsOptional() @IsString() serialOverride?: string;
    @IsOptional() @IsString() manufacturer?: string;
    @IsOptional() @IsString() model?: string;
    @IsOptional() @IsString() operatingSystem?: string;
    @IsOptional() @IsString() processor?: string;
    @IsOptional() @IsString() storage?: string;
    @IsOptional() @IsString() memory?: string;
    @IsOptional() @IsString() gpu?: string;
    @IsOptional() @IsString() macAddress?: string;
    @IsOptional() @IsString() details?: string;
    @IsOptional() @IsString() hostname?: string;
    @IsOptional() @IsString() username?: string;
    @IsOptional()
    @IsString()
    @Matches(/^\d{4}(-\d{2}(-\d{2})?)?$/)
    acquiredOn?: string;
    @IsOptional() @IsString() parHolder?: string;
    @IsOptional() @IsString() primaryUser?: string;
    @IsOptional() @IsString() remarks?: string;
    @IsOptional() @IsDateString() collectedOn?: string;
    @IsOptional() @IsString() scriptVersion?: string;
}
