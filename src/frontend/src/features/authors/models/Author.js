export class Author {
    constructor(id, nev) {
        this.id = id;
        this.nev = nev
    }

    static fromApi(data) {
        const author = new Author(data.id, data.nev);
        return author;
    }
}