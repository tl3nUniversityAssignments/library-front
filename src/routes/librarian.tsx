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
export const Route = createFileRoute("/librarian")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: make component fetch data from db and work with it here
  return (
    <div className="container mx-auto px-4 py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Панель бібліотекаря</h1>
        <p className="text-xl text-muted-foreground">
          Управління замовленнями та видачами
        </p>
      </header>

      <Tabs defaultValue="orders" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="orders">Замовлення</TabsTrigger>
          <TabsTrigger value="rents">Видачі</TabsTrigger>
          <TabsTrigger value="readers">Читачі</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="block">Назва книги</span>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Очікує видачі
                </Badge>
              </CardTitle>
              <CardDescription>Автор книги</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">Читач:</span>
                </div>
                <span>Ім'я</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата замовлення:
                  </span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Тип замовлення:
                  </span>
                </div>
                <span>Тип</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="grid grid-cols-2 gap-2">
              {/* TODO: make button show alert (or smth?) where librarian can choose to give out book on hands or in the reading room */}
              <Button>
                <Check className="w-4 h-4" />
                <span>Прийняти</span>
              </Button>
              {/* TODO: make button remove the order from db */}
              <Button variant="outline">
                <X className="w-4 h-4" />
                <span>Відхилити</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rents">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="block">Назва книги</span>
                {true ? (
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
              <CardDescription>Автор книги</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">Читач:</span>
                </div>
                <span>Ім'я</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата замовлення:
                  </span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Термін повернення:
                  </span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Тип замовлення:
                  </span>
                </div>
                <span>Тип</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              {/* TODO: make button to change this loan to "returned" */}
              <Button className="w-full">
                <Check className="w-4 h-4" />
                <span>Прийняти повернення</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="readers">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Ім'я читача</span>
              </CardTitle>
              <CardDescription>Електронна пошта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата реєстрації:
                  </span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Активні видачі:
                  </span>
                </div>
                <span>Кількість</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Усього видач:
                  </span>
                </div>
                <span>Кількість</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
