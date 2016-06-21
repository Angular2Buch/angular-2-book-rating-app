export class Book {
    rating: number;
    
    constructor(public title: string,
                public description: string) {
        this.rating = 0;
    }

    rateUp() {
        this.rating++;
    }
}
