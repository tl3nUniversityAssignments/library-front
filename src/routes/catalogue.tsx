import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { BookDTO } from "@/lib/types";
import { useAuth0 } from "@auth0/auth0-react";
import { ProtectedRoute } from "@/components/protected-route";

export const Route = createFileRoute("/catalogue")({
  component: () => (
    <ProtectedRoute>
      <RouteComponent />
    </ProtectedRoute>
  ),
});

function RouteComponent() {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availability, setAvailability] = useState("");

  const { user } = useAuth0();

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorNames
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      book.publicationYear
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);

    // make matches availability
    const matchesAvailability =
      availability === "" ||
      availability === "all" ||
      (availability === "available" && book.copiesId.length > 0) ||
      (availability === "unavailable" && book.copiesId.length === 0);

    return matchesSearch && matchesAvailability;
  });

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

  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-8 text-start flex justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Каталог книг</h1>
          <p className="text-xl text-muted-foreground">
            Обери книгу, яку хочеш орендувати
          </p>
        </div>
        <div className="flex items-start gap-1">
          <div className="relative flex w-80 mt-4">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Пошук книг за назвою, автором, ISBN"
              value={searchTerm}
              className="pl-8"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mt-4">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex items-start gap-4 py-4">
              <SheetHeader>
                <SheetTitle>Фільтри</SheetTitle>
                <SheetDescription>
                  Налаштуйте параметри пошуку книг
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 space-y-2">
                <Label htmlFor="availability">Наявність</Label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Усі книги" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Усі книги</SelectItem>
                    <SelectItem value="available">Є в наявності</SelectItem>
                    <SelectItem value="unavailable">
                      Немає в наявності
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-3 items-stretch gap-5">
        {filteredBooks.map((book) => (
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="block">{book.title}</span>
                {book.copiesId.length > 0 ? (
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
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Копій у наявності:
                  </span>
                  <span className="text-sm">{book.copiesId.length}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full">Замовити</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Замовлення книги</AlertDialogTitle>
                    <AlertDialogDescription>
                      Після замовлення цієї книги, вона буде додана до вашого
                      профілю. Будь ласка, повертайте книги вчасно!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Відмінити</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        // TODO: add order to db
                        fetch(
                          "http://localhost:8080/library_war_exploded/loans",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json; charset=UTF-8",
                            },
                            body: JSON.stringify({
                              copyId: book.copiesId.pop(),
                              readerId: user?.sub,
                              status: "ORDERED",
                            }),
                          },
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error(`HTTP error ${response.status}`);
                            }
                          })
                          .then(() => navigate({ to: "/user" }))
                          .catch((error) => {
                            console.error("Failed to order book:", error);
                          });
                      }}
                    >
                      Замовити
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
