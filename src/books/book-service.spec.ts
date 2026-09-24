import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from './book';
import { BookService } from './book-service';


describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it('should add a book correctly', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    };

    const result = service.addBook(book);

    expect(result).toBe(true);
  });

  // Test : L'ajout d'un livre sans titre ne doit pas fonctionner
  it('shouldn\'t add a titleless book', () => {
    const book: Book = {
      id: 10,
      title: '',
      author: 'Author',
      availableCopies: 1,
      totalCopies: 1,
    }

    const result = service.addBook(book);

    expect(result).not.toBe(true);
  });


  // Test : L'ajout d'un livre ayant totalCopies à 0 ou négatif ne doit pas fonctionner
  it('can\'t have totalCopies equals or lower to 0 on book creation', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 1,
      totalCopies: -2,
    }

    const result = service.addBook(book);

    expect(result).toBe(false);
  });

  // Test : Emprunter un livre doit décrémenter availableCopies
  it('should decrease availableCopies value', () => {
    // Création d'un livre pour réaliser le test
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 5,
      totalCopies: 10,
    };

    service.addBook(book);

    const books = service.getBooks();
    const initialAvailableCopies = books[3].availableCopies;
    // J'emprunte le 1er livre
    service.borrowBook(10);

    const updatedAvailableCopies = books[3].availableCopies;

    expect(initialAvailableCopies - updatedAvailableCopies).toEqual(1);
    expect(updatedAvailableCopies).toBe(4);
  })

  // Test : Ne pas emprunter un livre dont availableCopies est égal à 0
  it('shouldn\'t allow a book to be borrowed when availableCopies is 0', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 10,
    };

    service.addBook(book);

    const result = service.borrowBook(10);

    expect(result).toBe(false);
  })

  // Test : Ne pas emprunter un livre qui n'existe pas
  it('shouldn\'t allow to borrow a book that does not exist', () => {
    const result = service.borrowBook(10);

    expect(result).toBe(false);
  })

  // Test : Retourner un livre doit incrémenter availableCopies
  it('should increase availableCopies value when a book is returned', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 0,
      totalCopies: 3,
    };

    service.addBook(book);

    service.returnBook(10);

    expect(book.availableCopies).toBe(1);
  });

  // Test : Ne pas retourner un livre qui n'existe pas
  it('shouldn\'t allow to return a book that does not exist', () => {
    const result = service.returnBook(10);

    expect(result).toBe(false);
  })

  // Test : Ne pas retourner un livre dont toutes les copies ont déjà été rendues
  it('shouldn\'t allow to return a book not borrowed', () => {
    const book: Book = {
      id: 10,
      title: 'Test Book',
      author: 'Author',
      availableCopies: 3,
      totalCopies: 3,
    };

    service.addBook(book);

    const result = service.returnBook(10);

    expect(result).toBe(false);
  })

  // Ajoute des tests de ton choix pour les autres méthodes
});
