"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account, ID } from "@/app/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const { checkUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const login = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      await account.createEmailPasswordSession(loginEmail, loginPassword);
      await checkUser(); // Check user after session creation
      router.push('/editor');
    } catch (error: any) {
      setError(error?.message || "Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      await account.create(
        ID.unique(),
        registerEmail,
        registerPassword,
        registerUsername
      );
      
      await account.createEmailPasswordSession(registerEmail, registerPassword);
      await checkUser(); // Check user after registration and session creation
      router.push('/editor');
    } catch (error: any) {
      setError(error?.message || "Registration failed. Please try again.");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isRegister ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isRegister ? "Sign up for a new account" : "Login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isRegister ? (
              // Register Form
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Choose a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              // Login Form
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                onClick={isRegister ? register : login}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isRegister ? "Creating account..." : "Logging in..."}
                  </>
                ) : isRegister ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                variant="outline"
                className="w-full"
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
