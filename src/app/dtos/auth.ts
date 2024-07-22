export class Session {
    constructor(
        public loggedIn: boolean
    ) {}
}

export class Permissions {
    constructor(
        public hasPermissions: string[]
    ) {}
}

export class User {
    constructor(
        public userId: number,
        public userUuid: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public profilepicture: ProfilePicture,
    ) {}
}

export class ProfilePicture {
    constructor(
        public s128: string,
        public s512: string,
    ) {}
}