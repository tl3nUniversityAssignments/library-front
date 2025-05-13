export interface BookDTO {
  title: string;
  isbn: string;
  publicationYear: number;
  authorNames: string[];
  copiesId: number[];
};

export interface LoanDTO {
  id: number;
  copyId: number;
  readerId: number;
  orderDate: string;
  dueDate: string | null;
  status: "ORDERED" | "RETURNED" |"CHECKED_OUT" | "READING_ROOM";
  bookTitle: string;
  authorNames: string[];
  readerName: string;
  readerEmail: string;
}