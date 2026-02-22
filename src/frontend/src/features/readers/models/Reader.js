export class Reader {
    constructor(kartyaszam, nev, email, tel) {
        this.kartyaszam = kartyaszam;
        this.nev = nev;
        this.email = email;
        this.tel = tel;
    }

    static fromApi(data) {
        const reader = new Reader(data.kartyaszam, data.nev, data.email, data.tel);
        return reader;
    }
}