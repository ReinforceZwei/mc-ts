"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    constructor(ID, location, typeID) {
        this.ID = ID;
        this.typeID = typeID;
        this.location = location;
    }
}
exports.Entity = Entity;
class Location {
    constructor(X, Y, Z) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;
    }
    static CalculateDistance(l1, l2) {
        return Math.sqrt(Math.pow((l2.X - l1.X), 2) + Math.pow((l2.Y - l1.Y), 2) + Math.pow((l2.Z - l1.Z), 2));
    }
}
exports.Location = Location;
//# sourceMappingURL=DataTypes.js.map