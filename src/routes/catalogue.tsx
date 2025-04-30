import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/catalogue")({
  component: Catalogue,
});

interface BookDTO {
  title: string;
  isbn: string;
  publicationYear: number;
  authorNames: string[];
}

function Catalogue() {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "http://localhost:8080/library_war_exploded/books",
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-start flex justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Каталог книг</h1>
          <p className="text-xl text-muted-foreground">
            Обери книгу, яку хочеш орендувати
          </p>
        </div>
        <div className="relative flex w-80 mt-4">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground"/>
          <Input
            type="search"
            placeholder="Пошук книг за назвою, автором, ISBN"
            value={searchTerm}
            className="pl-8"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-stretch gap-5">
        {books.map((book) => (
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="block">{book.title}</span>
                {true ? (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    У наявності
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-500 border-red-200"
                  >
                    Немає в наявності
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                <span className="text-sm text-muted-foreground">
                  {book.authorNames.join(", ")}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-full space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Рік видання:
                  </span>
                  <span className="text-sm">{book.publicationYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ISBN:</span>
                  <span className="text-sm">{book.isbn}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button className="w-full">Замовити</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
