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
import { useAuth0 } from "@auth0/auth0-react";
export const Route = createFileRoute("/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout } = useAuth0();
  return (
    <div className="container mx-auto px-4 py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Панель користувача</h1>
        <p className="text-xl text-muted-foreground">
          Управління вашими книгами та замовленнями
        </p>
      </header>

      <Tabs defaultValue="onhand" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="onhand">На руках</TabsTrigger>
          <TabsTrigger value="ordered">Замовлення</TabsTrigger>
          <TabsTrigger value="history">Історія </TabsTrigger>
        </TabsList>

        <TabsContent value="onhand">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
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
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата видачі:
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
                    Тип видачі:
                  </span>
                </div>
                <span>Тип</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button className="w-full">
                <Check className="w-4 h-4" />
                <span>Прийняти</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ordered">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
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
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата замовлення:
                  </span>
                </div>
                <span>Дата</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <Button className="w-full">Повернути</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="grid grid-rows-[1fr_auto]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="block">Назва книги</span>
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 border-gray-200"
                >
                  Повернено
                </Badge>
              </CardTitle>
              <CardDescription>Автор книги</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">Дата видачі:</span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Дата Повернення:
                  </span>
                </div>
                <span>Дата</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="flex text-muted-foreground">
                    Тип видачі:
                  </span>
                </div>
                <span>Тип</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
