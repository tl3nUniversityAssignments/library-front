export interface BookDTO {
  title: string;
  isbn: string;
  publicationYear: number;
  authorNames: string[];
  availableCopies: number;
};

export interface LoanDTO {
    bookTitle: string;
    authorNames: string[];
    readerName: string;
    readerEmail: string;
    orderDate: string;
    dueDate?: string;
    status: "ORDERED" | "RETURNED" |"CHECKED_OUT" | "READING_ROOM";
}