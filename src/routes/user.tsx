import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, BookOpen, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { LoanDTO } from "@/lib/types";
import { useAuth0 } from "@auth0/auth0-react";
import { normalizeEmail } from "@/lib/utils";

export const Route = createFileRoute("/user")({
  component: RouteComponent,
});



function RouteComponent() {
  const { user } = useAuth0();
  // TODO: make component fetch data from db and work with it here
  const [loans, setLoans] = useState<LoanDTO[]>([]);

  const onhandLoans = loans.filter(
    (loan) =>
      normalizeEmail(loan.readerEmail) === normalizeEmail(user?.email!) &&
      (loan.status === "CHECKED_OUT" || loan.status === "READING_ROOM"),
  );
  const orderedLoans = loans.filter(
    (loan) =>
      normalizeEmail(loan.readerEmail) === normalizeEmail(user?.email!) &&
      loan.status === "ORDERED",
  );
  const historyLoans = loans.filter(
    (loan) =>
      normalizeEmail(loan.readerEmail) === normalizeEmail(user?.email!) &&
      loan.status === "RETURNED",
  );

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch(
        "http://localhost:8080/library_war_exploded/loans",
      );
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setLoans(data);
    };

    fetchLoans();
  }, []);
  return (
    <div className="container mx-auto px-4 py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Панель користувача</h1>
        <p className="text-xl text-muted-foreground">
          Управління вашими книгами та замовленнями
        </p>
      </header>

      <Tabs defaultValue="ordered" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="onhand">На руках</TabsTrigger>
          <TabsTrigger value="ordered">Замовлення</TabsTrigger>
          <TabsTrigger value="history">Історія </TabsTrigger>
        </TabsList>

        <TabsContent value="onhand">
          {onhandLoans.map((loan) => (
            <Card className="grid grid-rows-[1fr_auto]">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="block">{loan.bookTitle}</span>
                  {new Date() < new Date(loan.dueDate!) ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Активна
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      Прострочена
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{loan.authorNames.join(", ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Дата видачі:
                    </span>
                  </div>
                  <span>{loan.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Термін повернення:
                    </span>
                  </div>
                  <span>{loan.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Тип видачі:
                    </span>
                  </div>
                  <span>
                    {loan.status === "CHECKED_OUT"
                      ? "На абонемент"
                      : "У читальну залу"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ordered">
          {orderedLoans.map((loan) => (
            <Card className="grid grid-rows-[1fr_auto]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="block">{loan.bookTitle}</span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    Очікує видачі
                  </Badge>
                </CardTitle>
                <CardDescription>{loan.authorNames.join(", ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Дата замовлення:
                    </span>
                  </div>
                  <span>{loan.orderDate}</span>
                </div>
              </CardContent>
              <Separator />
              <CardFooter>
                {/* TODO: make button delete this order from db */}
                <Button variant="outline" className="w-full">
                  Скасувати
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history">
          {historyLoans.map((loan) => (
            <Card className="grid grid-rows-[1fr_auto]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="block">{loan.bookTitle}</span>
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-700 border-gray-200"
                  >
                    Повернено
                  </Badge>
                </CardTitle>
                <CardDescription>{loan.authorNames.join(", ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Дата видачі:
                    </span>
                  </div>
                  <span>{loan.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="flex text-muted-foreground">
                      Тип видачі:
                    </span>
                  </div>
                  <span>
                    {loan.status === "CHECKED_OUT"
                      ? "На абонемент"
                      : "У читальну залу"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
