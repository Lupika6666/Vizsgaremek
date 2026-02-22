export class BookCopy{
    constructor(id, hely, konyv_id){
        this.id = id;
        this.hely = hely;
        this.konyv_id = konyv_id;
    }

    static fromApi(data){
        const copy = new BookCopy(data.id, data.hely, data.konyv_id);
        return copy;
    }
}