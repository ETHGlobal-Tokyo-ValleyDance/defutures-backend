export declare class PositionDto {
    createdAt: Date;
    updatedAt: Date;
    owner: string;
    positionId: string;
    positionType: string;
    margin: string;
    strike: string;
    future: string;
    defuturePairId: string;
    static of(info: PositionDto): PositionDto;
}
export declare class PositionsDto {
    positions: PositionDto[];
    total: number;
    static of(info: PositionDto[], total: number): PositionsDto;
}
