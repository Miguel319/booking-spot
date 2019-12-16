import { Category } from "./category.enum";

export class Rental {
  id: number;
  title: string;
  city: string;
  street: string;
  category: Category;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createdAt?: Date;

  constructor(data: Rental) {
    this.id = data.id;
    this.title = data.title;
    this.city = data.city;
    this.street = data.street;
    this.category = data.category;
    this.image = data.image;
    this.bedrooms = data.bedrooms;
    this.description = data.description;
    this.dailyRate = data.dailyRate;
    this.shared = data.shared;
    this.createdAt = new Date();
  }
}
