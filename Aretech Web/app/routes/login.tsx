import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { jwtDecode } from "jwt-decode";
import { useBalanceStore } from "~/lib/store";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [animal, setAnimal] = useState<number>(1);

  const setBal = useBalanceStore(state => state.setBal);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

      if (localStorage.getItem("accessToken")) {
        navigate('/profile');
      }
    };

    fetchData();
  }, []);

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(window.ENV.API_URL + "/api/v1/user-login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const token = (await response.json()).token;
      localStorage.setItem('accessToken', token);
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);
      // @ts-ignore
      setBal(decoded.balance);
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error("An error occurred.");
    }
    setIsLoading(false);
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(window.ENV.API_URL + "/api/v1/user-signup", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        animal: ['Turtle', 'Bird', 'Squirrel'][animal - 1],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const token = (await response.json()).token;
      localStorage.setItem('accessToken', token);
      const decoded = jwtDecode(token);
      console.log("decoded", decoded);
      // @ts-ignore
      setBal(decoded.balance);
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error("An error occurred. This email may already be in use.");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-start mt-16">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Log in or sign up to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={logIn}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-green-600"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={signUp}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      placeholder="Choose a password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-animal">Favorite Animal</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border p-2 rounded relative">
                        {animal === 1 ? "Turtle" : animal === 2 ? "Bird" : "Squirrel"}
                        <ArrowDown className="absolute right-2 top-1/4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setAnimal(1)}>Turtle</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAnimal(2)}>Bird</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAnimal(3)}>Squirrel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-green-600"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}