import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault()
    setLoading(true)

    try {
      // Replace this URL with your API's login endpoint
      const response = await axios.post("http://localhost:4023/api/user/login", {
        email,
        phoneNumber,
        password,
      })

      // Assuming the API returns a token or user data on successful login
      const { token, user } = response.data

      // Store the token in localStorage (or another secure place)
      localStorage.setItem("authToken", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect to dashboard on success
      navigate("/dashboard")
    } catch (error) {
      console.error("Error during login:", error)
      alert("Invalid credentials! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl"></div>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                               <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input type="tel" id="phoneNumber" value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} required placeholder="0911001122" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
