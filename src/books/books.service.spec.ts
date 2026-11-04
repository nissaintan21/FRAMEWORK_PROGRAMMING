import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksService } from './books.service.js';
import { Book } from './entities/book.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';
import { Author } from '../authors/entities/authors.entity.js';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: vi.fn(),
            findOne: vi.fn(),
            create: vi.fn(),
            save: vi.fn(),
            merge: vi.fn(),
            softDelete: vi.fn(),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOneBy: vi.fn(),
          },
        },
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            findOneBy: vi.fn(),
          },
        },
        {
          provide: getRepositoryToken(Author),
          useValue: {
            findBy: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
