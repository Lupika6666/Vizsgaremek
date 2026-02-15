export class Genre {
    constructor(id, nev) {
        this.id = id;
        this.nev = nev
    }

    static fromApi(data) {
        const genre = new Genre(data.id, data.nev);
        return genre;
    }
}