import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { isLibrarian } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Separator } from "./ui/separator";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth0();
  const location = useLocation();
  return (
    isAuthenticated && (
      <>
        <div className="flex justify-between px-4 py-4 text-sm">
          {location.pathname !== "/" && (
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft />
                На головну
              </Button>
            </Link>
          )}
          <div className="flex">
            <Link to={isLibrarian() ? "/librarian" : "/user"}>
              <Button variant="outline">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={user?.picture} />
                </Avatar>
                <span>{user?.name}</span>
              </Button>
            </Link>
            <Button onClick={() => logout()} variant="outline">
              <LogOut />
            </Button>
          </div>
        </div>
        <Separator />
      </>
    )
  );
}
