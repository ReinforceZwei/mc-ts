interface Settings {
    Username: string;
    Password: string;
    Host: string;
    Port: number;

    AutoAttack: boolean;
    AutoFish: boolean;
}
let Setting: Settings = {
    Username: '',
    Password: '',
    Host: '',
    Port: 25565,
    AutoAttack: true,
    AutoFish: true
}
export default Setting;