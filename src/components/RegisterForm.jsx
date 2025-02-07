
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
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

// Updated validation schema
const schema = z.object({
  role: z.enum(["0", "1", "2", "3"]).default("0"),  // Role selection
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  phoneNumber: z.string().min(10, "Phone Number is required"),
  salesID: z.string().optional(),
  emergencyContact: z.string().min(10, "Emergency Contact is required"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
  }),
  idCard: z.string().optional(),
  signature: z.string().optional(),
  agreement: z.string().min(1, "Agreement is required"),
  profilePhoto: z.any().optional(),
  deviceId: z.string().min(1, "Device ID is required"),
  nationalId: z.string().min(1, "National ID is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function RegisterForm({ className, ...props }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      // Handle nested address fields
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && key === 'address') {
          for (const subKey in data[key]) {
            formData.append(`address[${subKey}]`, data[key][subKey])
          }
        } else {
          formData.append(key, data[key])
        }
      })

      const response = await axios.post("localhost:4023/api/user/createUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 201) {
        navigate("/")
      } else {
        alert("Registration failed!")
      }
    } catch (error) {
      console.error("Error during registration:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Role Selection */}
                  {/* <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select id="role" {...register("role")} className="p-2 border rounded">
                      <option value="0">User</option>
                      <option value="1">Admin</option>
                      <option value="2">Moderator</option>
                      <option value="3">Super Admin</option>
                    </select>
                  </div> */}

                  {/* Personal Information */}
                  {[
                    { label: "First Name", id: "firstName" },
                    { label: "Middle Name", id: "middleName" },
                    { label: "Last Name", id: "lastName" },
                    { label: "Date of Birth", id: "dateOfBirth", type: "date" },
                    { label: "Phone Number", id: "phoneNumber", type: "tel" },
                    { label: "Sales ID", id: "salesID" },
                    { label: "Emergency Contact", id: "emergencyContact", type: "tel" },
                    { label: "ID Card", id: "idCard" },
                    { label: "Signature", id: "signature" },
                    { label: "Device ID", id: "deviceId" },
                    { label: "National ID", id: "nationalId" },
                    { label: "Email", id: "email", type: "email" },
                    { label: "Password", id: "password", type: "password" },
                  ].map(({ label, id, type = "text" }) => (
                    <div key={id} className="grid gap-2">
                      <Label htmlFor={id}>{label}</Label>
                      <Input id={id} type={type} {...register(id)} />
                      {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
                    </div>
                  ))}

                  {/* Address Fields */}
                  <div className="grid gap-2">
                    <Label>Address</Label>
                    {["street", "city", "state", "postalCode"].map((field) => (
                      <div key={field}>
                        <Input placeholder={field.charAt(0).toUpperCase() + field.slice(1)} {...register(`address.${field}`)} />
                        {errors.address?.[field] && <p className="text-red-500 text-sm">{errors.address[field].message}</p>}
                      </div>
                    ))}
                  </div>

                  {/* Agreement and Profile Photo */}
                  <div className="grid gap-2">
                    <Label htmlFor="agreement">Agreement</Label>
                    <Textarea id="agreement" {...register("agreement")} />
                    {errors.agreement && <p className="text-red-500 text-sm">{errors.agreement.message}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                    <Input id="profilePhoto" type="file" {...register("profilePhoto")} />
                  </div>

                  <Button type="submit" className="w-full">Register</Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/" className="underline underline-offset-4">Login</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


