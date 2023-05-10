import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus, PriorityStatus, Status } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateScopeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsOptional()
    startDate: string;

    @ApiProperty()
    @IsOptional()
    endDate: string;

    @ApiProperty()
    @IsNotEmpty()
    priority: PriorityStatus;

    @ApiProperty()
    @IsNotEmpty()
    status: Status;

    @ApiProperty()
    @IsNotEmpty()
    payment: PaymentStatus;

    @ApiProperty()
    @IsNotEmpty()
    fee: number;
}