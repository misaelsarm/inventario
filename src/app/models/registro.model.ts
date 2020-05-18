export class Registro {
    public format: string;
    public name: string;
    public brand: string;
    public category: string;
    public barcode: string;
    public created: Date;

    constructor(format: string, name: string, brand: string, category: string, barcode: string) {
        this.format = format;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.barcode = barcode;
        this.created = new Date();
    }
}