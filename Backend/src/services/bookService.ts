import { Book, BookModel } from "../models/book";

class BookService {
  private books: Book[] = [];

  // GET ALL
  getAllBooks(): Book[] {
    return this.books;
  }

  // GET BY ID
  getBookById(id: string): Book | null {
    return this.books.find(book => book.id === id) || null;
  }

  // ADD BOOK
  addBook(bookData: Omit<Book, "id">): Book {
    const newBook = new BookModel(
      bookData.title,
      bookData.author,
      bookData.publishedYear
    );

    this.books.push(newBook);
    return newBook;
  }

  // UPDATE BOOK ✅ FIXED
  updateBook(id: string, updates: Partial<Omit<Book, "id">>): Book | null {
    const book = this.books.find(b => b.id === id);
    if (!book) return null;

    Object.assign(book, updates);
    return book;
  }

  // DELETE BOOK
  deleteBook(id: string): boolean {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }

  // BULK ADD (CSV)
  addBooks(
    books: Omit<Book, "id">[]
  ): { added: number; errors: { row: number; error: string }[] } {
    let added = 0;
    const errors: { row: number; error: string }[] = [];

    books.forEach((bookData, index) => {
      try {
        this.addBook(bookData);
        added++;
      } catch (error) {
        errors.push({
          row: index + 1,
          error: (error as Error).message
        });
      }
    });

    return { added, errors };
  }
}

export default new BookService();
