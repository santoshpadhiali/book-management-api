import { Router } from 'express';
import multer from 'multer';
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  importBooks
} from '../controllers/bookController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);
router.post('/books/import', upload.single('file'), importBooks);

export default router;