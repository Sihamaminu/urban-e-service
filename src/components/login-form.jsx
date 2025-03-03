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
import {jwtDecode} from 'jwt-decode';
import { useToast } from "@/hooks/use-toast"
import {Home}  from "lucide-react"

export default function LoginForm({ className, ...props }) {

  const API_URL = import.meta.env.VITE_API_URL;

  const { toast } = useToast()

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault()
    setLoading(true)

    try {
      // Replace this URL with your API's login endpoint
      const response = await axios.post(`${API_URL}/user/login`, {
        // email,
        phoneNumber,
        password,
      })

      // Assuming the API returns a token or user data on successful login
      const { token, user } = response.data


      if (response.data.token) {
        setCookie('accessToken', response.data.token, 7); // Cookie expires in 7 days
      } else {
        toast({ description: 'Login failed. Please try again.' });
      }


      // Store the token in localStorage (or another secure place)
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("user", JSON.stringify(user))
      const decodedPayload = jwtDecode(token);
  localStorage.setItem('userPayload', JSON.stringify(decodedPayload));
  localStorage.setItem("userId", decodedPayload.id);
  console.log('Token and payload stored successfully:', decodedPayload);

   // Show success toast
   toast({
    title: "Success",
    description: "Logged in successfully",
    variant: "success",
    className: "bg-primary text-secondary",
  })

      // Redirect to dashboard on success
      navigate("/dashboard")
    } catch (error) {
      console.error("Error during login:", error)
      alert("Invalid credentials! Please try again.")
      
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive",
      })

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
       {/* Header with Home Icon */}
       <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary">
          <Home size={24} />
          <span className="text-lg font-semibold">Home</span>
        </Link>
      </div>
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
                {/* <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div> */}
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
