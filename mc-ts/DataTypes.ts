export class Entity {
    ID: number;
    typeID: number;
    location: Location;
    constructor(ID: number, location: Location, typeID?: number) {
        this.ID = ID;
        this.typeID = typeID;
        this.location = location;
    }
}

export class Location {
    X: number;
    Y: number;
    Z: number;
    constructor(X: number, Y: number, Z: number) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    static CalculateDistance(l1: Location, l2: Location): number {
        return Math.sqrt(Math.pow((l2.X - l1.X), 2) + Math.pow((l2.Y - l1.Y), 2) + Math.pow((l2.Z - l1.Z), 2));
    }
}