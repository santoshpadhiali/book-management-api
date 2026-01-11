import { randomUUID } from "crypto";

export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

export class BookModel implements Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;

  constructor(title: string, author: string, publishedYear: number) {
    this.id = randomUUID();
    this.title = title;
    this.author = author;
    this.publishedYear = publishedYear;
  }
}
