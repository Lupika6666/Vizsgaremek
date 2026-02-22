export class Borrowing{
    constructor(id, kolcsonzes_ideje, hatarido, peldany_id, olvaso_id){
        this.id = id;
        this.kolcsonzes_ideje = kolcsonzes_ideje;
        this.hatarido = hatarido;
        this.peldany_id = peldany_id;
        this.olvaso_id = olvaso_id;
    }

    static fromApi(data){
        const borrowing = new Borrowing(data.id, data.kolcsonzes_ideje, data.hatarido, data.peldany_id, data.olvaso_id);
        return borrowing;
    }
}