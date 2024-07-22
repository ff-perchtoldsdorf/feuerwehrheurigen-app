// template
export class ScreenTemplateLight {
    constructor(
        public templateUuid: string,
        public name: string,
        public description: string
    ) { }
}

export class ScreenTemplate {
    constructor(
        public templateUuid: string,
        public name: string,
        public description: string,
        public settings: ScreenTemplateSettings
    ) { }
}

export class ScreenTemplateSettings {
    constructor(
        public headerShow: boolean,
        public navigation: boolean,
        public darkmode: boolean,
        public automaticDarkmode: boolean,
        public interactive: boolean,
        public onscreenKeyboard: boolean,
        public services: ScreenTemplateSettingsServices,
        public elements: ScreenTemplateElement[],
        public lastUpdate: string,
        public col: number,
        public row: number,
        public gallery: ScreenTemplateGallery
    ) { }
}

export class ScreenTemplateSettingsServices {
    constructor(
        public maps: boolean,
        public whiteboard: boolean,
        public operation: boolean,
        public gallery: boolean,
        public tv: boolean,
    ) { }
}

export class ScreenTemplateElement {
    constructor(
        public screenTemplateGridUuid: string,
        public nameIdentifier: string,
        public name: string,
        public dataSource: string,
        public gridArea: string,
        public viewStatus: string,
    ) { }
}

export class ScreenTemplateGallery {
    constructor(
        public duration: 10,
        public imageCover: boolean,
        public animation: string,
        public images: ScreenTemplateGalleryImage[],
    ) { }

}

export class ScreenTemplateGalleryImage {
    constructor(
        public screenTemplateGalleryImageUuid: string,
        public sortIndex: number,
        public image: string,
        public text: string,
        public hide: boolean,
    ) { }

}

export class ScreenElement {
    constructor(
        public nameIdentifier: string,
        public name: string,
        public dataSource: string
    ) { }
}

// screen
export class ScreenLight {
    constructor(
        public screenUuid: string,
        public templateUuid: string,
        public name: string,
        public loginDate: string,
    ) { }
}

export class ScreenActivation {
    constructor(
        public activationKey: string,
        public templateUuid: string,
        public name: string,
    ) { }
}

export class Screen {
    constructor(
        public screenUuid: string,
        public templateUuid: string,
        public name: string,
        public description: string,
        public activationKey: string,
        public loginDate: string,
    ) { }
}