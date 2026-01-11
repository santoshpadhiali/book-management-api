import { Request, Response, NextFunction } from 'express';
import bookService from '../services/bookService';
import { Book } from '../models/book';

export const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const book = bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const addBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || typeof publishedYear !== 'number') {
      return res.status(400).json({ message: 'Invalid book data' });
    }
    const newBook = bookService.addBook({ title, author, publishedYear });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates: Partial<Omit<Book, 'id'>> = req.body;
    const updatedBook = bookService.updateBook(id, updates);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = bookService.deleteBook(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const importBooks = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const csvData = req.file.buffer.toString('utf-8');
    const lines = csvData.split('\n').filter((line: string) => line.trim());
    const books: Omit<Book, 'id'>[] = [];
    const errors: { row: number; error: string }[] = [];

    lines.forEach((line: string, index: number) => {
      if (index === 0) return; // Skip header
      const [title, author, publishedYearStr] = line.split(',').map((s: string) => s.trim());
      const publishedYear = parseInt(publishedYearStr, 10);
      if (!title || !author || isNaN(publishedYear)) {
        errors.push({ row: index + 1, error: 'Invalid data: missing or incorrect fields' });
      } else {
        books.push({ title, author, publishedYear });
      }
    });

    const result = bookService.addBooks(books);
    res.json({
      added: result.added,
      errors: [...errors, ...result.errors]
    });
  } catch (error) {
    next(error);
  }
};