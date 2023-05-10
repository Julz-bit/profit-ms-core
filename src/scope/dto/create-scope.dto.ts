import { ApiProperty } from "@nestjs/swagger";
import { PriorityStatus, Status, PaymentStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

type ScopeType = {
    name: string;
    startDate: string;
    endDate: string;
    priority: PriorityStatus;
    status: Status;
    fee: number;
    payment: PaymentStatus;
}

export class CreateScopeDto {
    @IsOptional()
    @ApiProperty()
    scopes: ScopeType[]

    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty()
    projectId: number;
}