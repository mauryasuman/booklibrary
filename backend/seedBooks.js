/**
 * seedBooks.js
 * 
 * Usage: node seedBooks.js
 * 
 * Seeding script for 40 UNIQUE books.
 * Connects to MongoDB and populates the database.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const { saveBooksToFile } = require('./persistence/bookPersistence');

// Dummy properties
// Using a fixed ObjectId for consistency
const ADMIN_ID = new mongoose.Types.ObjectId('64e66a3a7731728123456789');

const books = [
  // 1. Fiction
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel set in the Roaring Twenties, presenting the tragic story of Jay Gatsby and his unrequited love for Daisy Buchanan. It explores themes of decadence, idealism, and the American Dream.',
    price: 14.99,
    category: 'Fiction',
    isbn: '9780743273565',
    pages: 180,
    publishedYear: 1925,
    imageURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 25,
    views: { totalViews: 1250, todayViews: 12, weeklyViews: 85, lastViewedAt: new Date() }
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in Airstrip One, formerly Great Britain, a province of the superstate Oceania. The story follows Winston Smith as he wrestles with oppression in Oceania.',
    price: 13.50,
    category: 'Fiction',
    isbn: '9780451524935',
    pages: 328,
    publishedYear: 1949,
    imageURL: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 28,
    views: { totalViews: 3900, todayViews: 25, weeklyViews: 190, lastViewedAt: new Date() }
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A timeless classic of growing up and the human dignity that unites us all. The book explores the roots of human behavior - to innocence and experience, kindness and cruelty.',
    price: 11.99,
    category: 'Fiction',
    isbn: '9780061120084',
    pages: 281,
    publishedYear: 1960,
    imageURL: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 14,
    views: { totalViews: 4500, todayViews: 30, weeklyViews: 210, lastViewedAt: new Date() }
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A story about a shepherd boy who travels to the Egyptian pyramids in search of a treasure. It is a modern classic that has sold millions of copies around the world.',
    price: 12.99,
    category: 'Fiction',
    isbn: '9780061122415',
    pages: 208,
    publishedYear: 1988,
    imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 30,
    views: { totalViews: 2800, todayViews: 15, weeklyViews: 110, lastViewedAt: new Date() }
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel of manners written by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.',
    price: 9.99,
    category: 'Fiction',
    isbn: '9780141439518',
    pages: 432,
    publishedYear: 1813,
    imageURL: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 18,
    views: { totalViews: 3100, todayViews: 10, weeklyViews: 75, lastViewedAt: new Date() }
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A story about a few days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. It is a classic novel of teenage angst and rebellion.',
    price: 10.99,
    category: 'Fiction',
    isbn: '9780316769488',
    pages: 277,
    publishedYear: 1951,
    imageURL: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 22,
    views: { totalViews: 2200, todayViews: 14, weeklyViews: 90, lastViewedAt: new Date() }
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description: 'A dystopian social science fiction novel by English author Aldous Huxley, written in 1931 and published in 1932. It anticipates huge scientific advancements in reproductive technology.',
    price: 14.50,
    category: 'Fiction',
    isbn: '9780060850524',
    pages: 268,
    publishedYear: 1932,
    imageURL: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 16,
    views: { totalViews: 1900, todayViews: 11, weeklyViews: 65, lastViewedAt: new Date() }
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    description: 'A novel about a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves. It explores the dark side of human nature.',
    price: 11.50,
    category: 'Fiction',
    isbn: '9780399501487',
    pages: 224,
    publishedYear: 1954,
    imageURL: 'https://images.unsplash.com/photo-1526318472351-c75fcf070c73?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 20,
    views: { totalViews: 2500, todayViews: 18, weeklyViews: 100, lastViewedAt: new Date() }
  },

  // 2. Science Fiction & Fantasy
  {
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
    price: 22.00,
    category: 'Science',
    isbn: '9780441013593',
    pages: 412,
    publishedYear: 1965,
    imageURL: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 18,
    views: { totalViews: 4100, todayViews: 60, weeklyViews: 400, lastViewedAt: new Date() }
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel by J. R. R. Tolkien. It follows the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by the dragon, Smaug.',
    price: 15.99,
    category: 'Fiction',
    isbn: '9780547928227',
    pages: 310,
    publishedYear: 1937,
    imageURL: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 35,
    views: { totalViews: 5500, todayViews: 80, weeklyViews: 500, lastViewedAt: new Date() }
  },
  {
    title: 'Ender\'s Game',
    author: 'Orson Scott Card',
    description: 'A military science fiction novel set in Earth\'s future, presenting an imperiled mankind after two conflicts with the "Buggers", an insectoid alien species.',
    price: 13.99,
    category: 'Science',
    isbn: '9780812550702',
    pages: 324,
    publishedYear: 1985,
    imageURL: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 12,
    views: { totalViews: 3200, todayViews: 25, weeklyViews: 150, lastViewedAt: new Date() }
  },
  {
    title: 'Foundation',
    author: 'Isaac Asimov',
    description: 'The first book in the Foundation Series. It describes a future where the Milky Way Galaxy is governed by the Galactic Empire, which is falling into decay.',
    price: 16.99,
    category: 'Science',
    isbn: '9780553293357',
    pages: 255,
    publishedYear: 1951,
    imageURL: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 15,
    views: { totalViews: 2800, todayViews: 20, weeklyViews: 120, lastViewedAt: new Date() }
  },
  {
    title: 'Neuromancer',
    author: 'William Gibson',
    description: 'A 1984 science fiction novel by American-Canadian writer William Gibson. It is considered to be one of the earliest and best-known works in the cyberpunk genre.',
    price: 14.99,
    category: 'Science',
    isbn: '9780441569595',
    pages: 271,
    publishedYear: 1984,
    imageURL: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 10,
    views: { totalViews: 1800, todayViews: 12, weeklyViews: 80, lastViewedAt: new Date() }
  },
  {
    title: 'Snow Crash',
    author: 'Neal Stephenson',
    description: 'A science fiction novel by American writer Neal Stephenson, published in 1992. Like many of Stephenson\'s other novels, it covers history, linguistics, anthropology, and computer science.',
    price: 15.50,
    category: 'Science',
    isbn: '9780553380958',
    pages: 480,
    publishedYear: 1992,
    imageURL: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 14,
    views: { totalViews: 2100, todayViews: 15, weeklyViews: 95, lastViewedAt: new Date() }
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    description: 'A 2011 science fiction novel penned by Andy Weir. It was his debut novel under his own name. It was originally self-published in 2011; Crown Publishing purchased the rights and re-released it in 2014.',
    price: 12.99,
    category: 'Science',
    isbn: '9780553418026',
    pages: 369,
    publishedYear: 2011,
    imageURL: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 22,
    views: { totalViews: 3800, todayViews: 40, weeklyViews: 250, lastViewedAt: new Date() }
  },
  {
    title: 'Ready Player One',
    author: 'Ernest Cline',
    description: 'A 2011 science fiction novel, and the debut novel of American author Ernest Cline. The plot, set in a dystopia in 2045, follows protagonist Wade Watts on his search for an Easter egg.',
    price: 13.99,
    category: 'Science',
    isbn: '9780307887436',
    pages: 374,
    publishedYear: 2011,
    imageURL: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 25,
    views: { totalViews: 4200, todayViews: 50, weeklyViews: 300, lastViewedAt: new Date() }
  },

  // 3. Non-Fiction, History, Biography
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'Explores the history of humankind from the Stone Age up to the twenty-first century. It focuses on Homo sapiens, the only remaining human species.',
    price: 18.50,
    category: 'History',
    isbn: '9780062316097',
    pages: 443,
    publishedYear: 2011,
    imageURL: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 40,
    views: { totalViews: 3200, todayViews: 20, weeklyViews: 150, lastViewedAt: new Date() }
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    description: 'A memoir by American author Tara Westover. Westover recounts overcoming her survivalist Mormon upbringing to go to college, and emphasizes the importance of education to enlarging her world.',
    price: 16.50,
    category: 'Biography',
    isbn: '9780399590504',
    pages: 352,
    publishedYear: 2018,
    imageURL: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 9,
    views: { totalViews: 2950, todayViews: 19, weeklyViews: 130, lastViewedAt: new Date() }
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    description: 'The memoir of former United States First Lady Michelle Obama, published in 2018. Described by the author as a deeply personal experience, the book talks about her roots.',
    price: 17.99,
    category: 'Biography',
    isbn: '9781524763138',
    pages: 448,
    publishedYear: 2018,
    imageURL: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 33,
    views: { totalViews: 5200, todayViews: 50, weeklyViews: 300, lastViewedAt: new Date() }
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy & proven way to build good habits & break bad ones. The book provides a practical framework for improving every day.',
    price: 16.99,
    category: 'Non-Fiction',
    isbn: '9780735211292',
    pages: 320,
    publishedYear: 2018,
    imageURL: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 50,
    views: { totalViews: 6000, todayViews: 100, weeklyViews: 650, lastViewedAt: new Date() }
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'The major New York Times bestseller that explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
    price: 19.99,
    category: 'Non-Fiction',
    isbn: '9780374275631',
    pages: 499,
    publishedYear: 2011,
    imageURL: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 22,
    views: { totalViews: 1500, todayViews: 8, weeklyViews: 45, lastViewedAt: new Date() }
  },
  {
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    description: 'A book by Charles Duhigg, a New York Times reporter, published in February 2012 by Random House. It explores the science behind habit creation and reformation.',
    price: 15.99,
    category: 'Non-Fiction',
    isbn: '9781400069286',
    pages: 371,
    publishedYear: 2012,
    imageURL: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 30,
    views: { totalViews: 2400, todayViews: 22, weeklyViews: 115, lastViewedAt: new Date() }
  },
  {
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    description: 'A non-fiction book written by Malcolm Gladwell and published by Little, Brown and Company on November 18, 2008. It examines the factors that contribute to high levels of success.',
    price: 14.99,
    category: 'Non-Fiction',
    isbn: '9780316017930',
    pages: 309,
    publishedYear: 2008,
    imageURL: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 25,
    views: { totalViews: 3000, todayViews: 28, weeklyViews: 145, lastViewedAt: new Date() }
  },
  {
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    description: 'A transdisciplinary non-fiction book by Jared Diamond. In 1998, it won the Pulitzer Prize for General Non-Fiction and the Aventis Prize for Best Science Book.',
    price: 18.99,
    category: 'History',
    isbn: '9780393038910',
    pages: 480,
    publishedYear: 1997,
    imageURL: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 14,
    views: { totalViews: 1900, todayViews: 10, weeklyViews: 60, lastViewedAt: new Date() }
  },

  // 4. Technology & Programming
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A Handbook of Agile Software Craftsmanship. A must-read for any developer wanting to write better, maintainable code. It covers principles, patterns, and practices.',
    price: 34.99,
    category: 'Technology',
    isbn: '9780132350884',
    pages: 464,
    publishedYear: 2008,
    imageURL: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 15,
    views: { totalViews: 5000, todayViews: 45, weeklyViews: 320, lastViewedAt: new Date() }
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    description: 'Your journey to mastery. This book cuts through the increasing specialization and technicalities of modern software development to examine the core process.',
    price: 45.00,
    category: 'Technology',
    isbn: '9780201616224',
    pages: 352,
    publishedYear: 1999,
    imageURL: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 10,
    views: { totalViews: 3100, todayViews: 22, weeklyViews: 140, lastViewedAt: new Date() }
  },
  {
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry.',
    price: 25.00,
    category: 'Technology',
    isbn: '9780596517748',
    pages: 176,
    publishedYear: 2008,
    imageURL: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 15,
    views: { totalViews: 1800, todayViews: 5, weeklyViews: 40, lastViewedAt: new Date() }
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    description: 'This book provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth.',
    price: 65.00,
    category: 'Technology',
    isbn: '9780262033848',
    pages: 1312,
    publishedYear: 2009,
    imageURL: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 8,
    views: { totalViews: 1200, todayViews: 6, weeklyViews: 30, lastViewedAt: new Date() }
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma',
    description: 'Elements of Reusable Object-Oriented Software. This book captures a wealth of experience about the design of object-oriented software.',
    price: 49.99,
    category: 'Technology',
    isbn: '9780201633610',
    pages: 395,
    publishedYear: 1994,
    imageURL: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 12,
    views: { totalViews: 2600, todayViews: 15, weeklyViews: 85, lastViewedAt: new Date() }
  },
  {
    title: 'You Don\'t Know JS',
    author: 'Kyle Simpson',
    description: 'A series of books diving deep into the core mechanisms of the JavaScript language. This book explores scope and closures.',
    price: 29.99,
    category: 'Technology',
    isbn: '9781491904244',
    pages: 98,
    publishedYear: 2014,
    imageURL: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 20,
    views: { totalViews: 2900, todayViews: 18, weeklyViews: 95, lastViewedAt: new Date() }
  },
  {
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    description: 'This book provides a comprehensive introduction to the JavaScript language. It covers the language itself, the browser, and Node.js.',
    price: 32.00,
    category: 'Technology',
    isbn: '9781593279509',
    pages: 472,
    publishedYear: 2018,
    imageURL: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 25,
    views: { totalViews: 3500, todayViews: 25, weeklyViews: 150, lastViewedAt: new Date() }
  },
  {
    title: 'Head First Design Patterns',
    author: 'Eric Freeman',
    description: 'A brain-friendly guide to building object-oriented software/applications. It makes learning complex concepts easy and fun.',
    price: 39.99,
    category: 'Technology',
    isbn: '9780596007126',
    pages: 694,
    publishedYear: 2004,
    imageURL: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 18,
    views: { totalViews: 2200, todayViews: 12, weeklyViews: 80, lastViewedAt: new Date() }
  },

  // 5. Children's Books
  {
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    description: 'A beloved children\'s picture book. It follows the life cycle of a caterpillar as it eats its way through a variety of foods.',
    price: 8.99,
    category: 'Children',
    isbn: '9780399226908',
    pages: 26,
    publishedYear: 1969,
    imageURL: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 30,
    views: { totalViews: 1600, todayViews: 10, weeklyViews: 50, lastViewedAt: new Date() }
  },
  {
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    description: 'A 1963 children\'s picture book. The book has been adapted into other media several times, including an animated short in 1973.',
    price: 9.99,
    category: 'Children',
    isbn: '9780060254926',
    pages: 48,
    publishedYear: 1963,
    imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 25,
    views: { totalViews: 1800, todayViews: 12, weeklyViews: 60, lastViewedAt: new Date() }
  },
  {
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    description: 'A classic children\'s literature in North America. The text is a rhyming poem, describing a bunny saying "goodnight" to everything in his room.',
    price: 7.99,
    category: 'Children',
    isbn: '9780060775858',
    pages: 32,
    publishedYear: 1947,
    imageURL: 'https://images.unsplash.com/photo-1520261314227-86c55986927c?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 40,
    views: { totalViews: 2100, todayViews: 15, weeklyViews: 70, lastViewedAt: new Date() }
  },
  {
    title: 'Charlotte\'s Web',
    author: 'E.B. White',
    description: 'A children\'s novel story of a pig named Wilbur and his friendship with a barn spider named Charlotte. It is a classic of children\'s literature.',
    price: 8.99,
    category: 'Children',
    isbn: '9780064400558',
    pages: 192,
    publishedYear: 1952,
    imageURL: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 35,
    views: { totalViews: 2400, todayViews: 20, weeklyViews: 85, lastViewedAt: new Date() }
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    description: 'The first novel in the Harry Potter series. It follows Harry Potter, a young wizard who discovers his magical heritage.',
    price: 12.00,
    category: 'Children',
    isbn: '9780590353427',
    pages: 309,
    publishedYear: 1997,
    imageURL: 'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 50,
    views: { totalViews: 6500, todayViews: 120, weeklyViews: 700, lastViewedAt: new Date() }
  },
  {
    title: 'Matilda',
    author: 'Roald Dahl',
    description: 'A book about a young girl of unusual precocity, and her often ill-treatment at the hands of her parents and her headmistress.',
    price: 10.50,
    category: 'Children',
    isbn: '9780142410370',
    pages: 240,
    publishedYear: 1988,
    imageURL: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 28,
    views: { totalViews: 2000, todayViews: 14, weeklyViews: 75, lastViewedAt: new Date() }
  },
  {
    title: 'The Cat in the Hat',
    author: 'Dr. Seuss',
    description: 'A children\'s book written and illustrated by Theodor Geisel under the pen name Dr. Seuss and first published in 1957.',
    price: 9.50,
    category: 'Children',
    isbn: '9780394800011',
    pages: 61,
    publishedYear: 1957,
    imageURL: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 32,
    views: { totalViews: 2700, todayViews: 18, weeklyViews: 95, lastViewedAt: new Date() }
  },
  {
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    description: 'A children\'s book by Dr. Seuss, first published on August 12, 1960. As of 2001, according to Publishers Weekly, it was the fourth best-selling English-language children\'s book.',
    price: 8.99,
    category: 'Children',
    isbn: '9780394800165',
    pages: 62,
    publishedYear: 1960,
    imageURL: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    stockQuantity: 40,
    views: { totalViews: 3000, todayViews: 22, weeklyViews: 110, lastViewedAt: new Date() }
  }
];

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

    // Force IPv4 if localhost is used, to avoid ::1 connection issues on some systems
    if (uri.includes('localhost')) {
      uri = uri.replace('localhost', '127.0.0.1');
    }

    console.log(`Connecting to MongoDB at ${uri}...`);
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n❌ Error: Failed to connect to MongoDB.`);
    console.error(`Message: ${error.message}`);
    console.error(`\nPossible solutions:`);
    console.error(`1. Make sure MongoDB is installed and running.`);
    console.error(`2. Check your connection string in .env`);
    console.error(`3. If using Docker, ensure the port is exposed.`);
    process.exit(1);
  }
};

const importData = async () => {
  await connectDB();

  try {
    // Check if we should force clear, but for this task we will just overwrite if --force is used or if the user wants.
    // The previous prompt implied just running the script. I'll add the check.
    const force = process.argv.includes('--force');
    const count = await Book.countDocuments();

    if (count > 0 && !force) {
      console.log(`\n⚠️  Database already contains ${count} books.`);
      console.log('To overwrite, run with --force:');
      console.log('node seedBooks.js --force');
      process.exit();
    }

    // Clear existing data if force or just to be clean
    if (force) {
      await Book.deleteMany();
      console.log('Data Destroyed...');
    }

    // Add createdBy to all books
    const sampleBooks = books.map((book) => {
      return { ...book, createdBy: ADMIN_ID };
    });

    const insertedBooks = await Book.insertMany(sampleBooks);
    
    // Also update persistent storage file
    console.log('💾 Updating persistent storage file (books.json)...');
    saveBooksToFile(insertedBooks);

    console.log(`\n✅ Success! ${sampleBooks.length} books imported and persisted successfully.`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();
