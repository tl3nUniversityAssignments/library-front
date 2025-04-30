import { createFileRoute } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, ShieldUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isLibrarian } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Бібліотечна система</h1>
        <p className="text-xl text-muted-foreground">Управління видачами</p>
      </header>

      <div className="flex justify-center gap-5">
        {isAuthenticated ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5"/>
                <span>Каталог книг</span>
              </CardTitle>
              <CardDescription>Пошук та перегляд доступних книг</CardDescription>
            </CardHeader>
            <CardContent>
              Повний каталог книг з можливістю пошуку за назвою, автором, ISBN.
            </CardContent>
            <CardFooter>
              <a className="w-full" href="/catalogue">
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4"/>
                  Перейти до каталогу
                </Button>
              </a>
            </CardFooter>
          </Card>
        ) : <Button onClick={() => {loginWithRedirect()}}>Увійти в акаунт</Button>}
        {isLibrarian() && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldUser className="h-5 w-5" />
                <span>Панель управління бібліотекаря</span>
              </CardTitle>
              <CardDescription>Управління видачею книг читачам</CardDescription>
            </CardHeader>
            <CardContent>
              Інтерфейс для бібліотекарів з функцією видачі книг та обліку користувачів.
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Перейти до панелі управління
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
