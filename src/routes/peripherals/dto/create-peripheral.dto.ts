import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class CreatePeripheralDto {
    @IsString() @MinLength(1) @MaxLength(64) syncId!: string;
    @IsString() @MinLength(1) type!: string;
    @IsOptional() @IsString() computerSerialNumber?: string;
    @IsOptional() @IsString() manufacturer?: string;
    @IsOptional() @IsString() model?: string;
    @IsOptional() @IsString() serialNumber?: string;
    @IsOptional() @IsString() assetTag?: string;
    @IsOptional() @IsString() assignedUser?: string;
    @IsOptional() @IsString() remarks?: string;
}
