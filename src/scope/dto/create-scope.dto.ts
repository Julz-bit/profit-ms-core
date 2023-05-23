import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { ScopeDto } from "./scope.dto";


export class CreateScopeDto {
    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ScopeDto)
    scopes: ScopeDto[];

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    projectId: number;
}