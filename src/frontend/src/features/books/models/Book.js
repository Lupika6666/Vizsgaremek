export class Book{
    constructor(id, cim, isbn, pub_ev, leiras, nyelv_id, szerzo_id, mufaj_id){
        this.id = id;
        this.cim = cim;
        this.isbn = isbn;
        this.publikalas_ev = pub_ev;
        this.leiras = leiras;
        this.nyelv_id = nyelv_id;
        this.szerzo_id = szerzo_id;
        this.mufaj_id = mufaj_id;
    }

    static fromApi(data){
        const book = new Book(data.id, data.cim, data.isbn, data.publikalas_ev, data.leiras, data.nyelv, data.szerzo, data.mufaj);
        return book;
    }
}