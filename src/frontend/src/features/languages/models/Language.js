export class Language {
    constructor(id, nev) {
        this.id = id;
        this.nev = nev
    }

    static fromApi(data) {
        const language = new Language(data.id, data.nev);
        return language;
    }
}