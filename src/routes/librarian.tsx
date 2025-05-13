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
import { User, Calendar, BookOpen, Check, X, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { LoanDTO } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProtectedRoute } from "@/components/protected-route";

export const Route = createFileRoute("/librarian")({
  component: () => (
    <ProtectedRoute requireLibrarian>
      <RouteComponent />
    </ProtectedRoute>
  ),
});

function RouteComponent() {
  const [loans, setLoans] = useState<LoanDTO[]>([]);
  const [loanType, setLoanType] = useState<"CHECKED_OUT" | "READING_ROOM">(
    "CHECKED_OUT",
  );

  const orders = loans.filter((loan) => loan.status === "ORDERED");
  const rents = loans.filter(
    (loan) => loan.status === "CHECKED_OUT" || loan.status === "READING_ROOM",
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
        <h1 className="text-4xl font-bold mb-2">Панель бібліотекаря</h1>
        <p className="text-xl text-muted-foreground">
          Управління замовленнями та видачами
        </p>
      </header>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Замовлення</TabsTrigger>
          <TabsTrigger value="rents">Видачі</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className="grid grid-cols-3 items-stretch gap-5">
            {orders.map((order) => (
              <Card className="grid grid-rows-[1fr_auto]">
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span className="block">{order.bookTitle}</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Очікує видачі
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {order.authorNames.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">Читач:</span>
                    </div>
                    <span>{order.readerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">
                        Дата замовлення:
                      </span>
                    </div>
                    <span>{order.orderDate}</span>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <RadioGroup
                      defaultValue="CHECKED_OUT"
                      onValueChange={(value) =>
                        setLoanType(value as "CHECKED_OUT" | "READING_ROOM")
                      }
                    >
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="CHECKED_OUT" id="r-onhands" />
                        <Label htmlFor="r-onhands">На абонемент</Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem
                          value="READING_ROOM"
                          id="r-reading-room"
                        />
                        <Label htmlFor="r-reading-room">У читальну залу</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      fetch(
                        `http://localhost:8080/library_war_exploded/loans/${order.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ status: loanType }),
                        },
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(`HTTP error ${response.status}`);
                          }
                        })
                        .then(() => {
                          window.location.reload();
                        })
                        .catch((error) => {
                          console.error("Failed to rent loan:", error);
                        });
                    }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Прийняти</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      fetch(
                        `http://localhost:8080/library_war_exploded/loans/${order.id}`,
                        {
                          method: "DELETE",
                        },
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(`HTTP error ${response.status}`);
                          }
                        })
                        .then(() => {
                          window.location.reload();
                        })
                        .catch((error) => {
                          console.error("Failed to delete loan:", error);
                        });
                    }}
                  >
                    <X className="w-4 h-4" />
                    <span>Відхилити</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rents">
          <div className="grid grid-cols-3 items-stretch gap-5">
            {rents.map((rent) => (
              <Card className="grid grid-rows-[1fr_auto]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="block">{rent.bookTitle}</span>
                    {new Date() < new Date(rent.dueDate!) ? (
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
                  <CardDescription>
                    {rent.authorNames.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">Читач:</span>
                    </div>
                    <span>{rent.readerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">
                        Дата замовлення:
                      </span>
                    </div>
                    <span>{rent.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">
                        Термін повернення:
                      </span>
                    </div>
                    <span>{rent.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="flex text-muted-foreground">
                        Тип замовлення:
                      </span>
                    </div>
                    <span>
                      {rent.status === "CHECKED_OUT"
                        ? "На абонемент"
                        : "У читальну залу"}
                    </span>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => {
                      fetch(
                        `http://localhost:8080/library_war_exploded/loans/${rent.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ status: "RETURNED" }),
                        },
                      )
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(`HTTP error ${response.status}`);
                          }
                        })
                        .then(() => {
                          window.location.reload();
                        })
                        .catch((error) => {
                          console.error("Failed to return loan:", error);
                        });
                    }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Прийняти повернення</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
