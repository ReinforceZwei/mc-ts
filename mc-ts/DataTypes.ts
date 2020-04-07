export class Entity {
    ID: number;
    typeID: number;
    location: Location;
    constructor(ID: number, location: Location, typeID?: number) {
        this.ID = ID;
        this.typeID = typeID;
        this.location = location;
    }
    IsHostile() {
        switch (this.typeID) {
            case 5: return true;  // Blaze;
            case 12: return true; // Creeper
            case 16: return true; // Drowned
            case 23: return true; // Evoker
            case 29: return true; // Ghast
            case 31: return true; // Guardian
            case 33: return true; // Husk
            case 41: return true; // Magma Cube
            case 57: return true; // Zombie Pigman
            case 63: return true; // Shulker
            case 65: return true; // Silverfish
            case 66: return true; // Skeleton
            case 68: return true; // Slime
            case 75: return true; // Stray
            case 84: return true; // Vex
            case 87: return true; // Vindicator
            case 88: return true; // Pillager
            case 90: return true; // Witch
            case 92: return true; // Wither Skeleton
            case 95: return true; // Zombie
            case 97: return true; // Zombie Villager
            case 98: return true; // Phantom
            case 99: return true; // Ravager
            default: return false;
        }
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