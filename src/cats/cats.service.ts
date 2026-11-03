import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './models/CreateCatDto.js';

@Injectable()
export class CatsService {


    cats: CreateCatDto[] = [
        {
            id: 1,
            name: "Whiskers",
            age: 3,
            breed: "Persian",
        },
        {
            id: 2,
            name: "Luna",
            age: 2,
            breed: "Siamese",
        },
        {
            id: 3,
            name: "Simba",
            age: 5,
            breed: "Maine Coon",
        },
        {
            id: 4,
            name: "Milo",
            age: 1,
            breed: "Bengal",
        },
        {
            id: 5,
            name: "Bella",
            age: 4,
            breed: "British Shorthair",
        },
    ];

    async getAllCats(): Promise<CreateCatDto[]> {
        return this.cats;
    }

    async findCat(id: string): Promise<CreateCatDto | undefined> {
        return this.cats.find(cat => cat.name.toLowerCase() === id.toLowerCase());
    }

    async addCat(cat: CreateCatDto): Promise<void> {
        cat.id = this.cats.length + 1;
        this.cats.push(cat);
    }

    async updateCat(cat: CreateCatDto): Promise<boolean> {
        const index = this.cats.findIndex(c => c.id === cat.id);
        if (index !== -1) {
            this.cats[index] = cat;
            return true;
        }
        return false;
    }

    async removeCat(id: number): Promise<boolean> {
        const cat: CreateCatDto | undefined = this.cats.find(m => m.id === id);
        if (cat) {
            this.cats = this.cats.filter(m => m.id !== id);
            return true;
        }
        return false;
    }


}