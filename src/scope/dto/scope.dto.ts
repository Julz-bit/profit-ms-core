import { PaymentStatus, PriorityStatus, Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class ScopeDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

    @IsEnum(PriorityStatus)
    @IsNotEmpty()
    priority: PriorityStatus;

    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @IsNotEmpty()
    fee: number;

    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    payment: PaymentStatus;
}
