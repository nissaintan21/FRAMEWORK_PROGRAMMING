import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { Publisher } from '../../publishers/entities/publisher.entity.js';
import { Author } from '../../authors/entities/authors.entity.js';
import { OrderItem } from '../../orders/entities/orderItem.entity.js';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  isbn: string;

  @Column({ name: 'published_year', type: 'int', default: 0 })
  publishedYear: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  // Relasi Many-to-One ke Category
  @ManyToOne(() => Category, (category) => category.books, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Relation<Category>;

  // Relasi Many-to-One ke Publisher
  @ManyToOne(() => Publisher, (publisher) => publisher.books, { nullable: true })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Relation<Publisher>;

  // Relasi Many-to-Many ke Author (via pivot book_authors)
  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'book_authors',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'author_id', referencedColumnName: 'id' },
  })
  authors: Relation<Author>[];

  // Relasi One-to-Many ke OrderItem
  @OneToMany(() => OrderItem, (orderItem) => orderItem.book)
  orderItems: Relation<OrderItem>[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
