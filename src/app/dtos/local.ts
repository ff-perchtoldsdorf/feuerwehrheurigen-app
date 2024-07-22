export class LocalNotification {
    constructor(
        public title: string,
        public message: string,
        public type: string = 'default',
        public timeout: number = 5000
    ) { }
}