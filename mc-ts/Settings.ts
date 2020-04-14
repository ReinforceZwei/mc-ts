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

let setting = {
    'account': {
        'username': '',
        'password': ''
    },
    'server': {
        'host': '',
        'port': 25565
    },
    'autobots': {
        'autoattack': {
            'enabled': true,
            'range': 4
        },
        'autofish': {
            'enabled': true
        },
        'autoeat': {
            'enabled': true,
            'hunger': 6
        }
    }
}