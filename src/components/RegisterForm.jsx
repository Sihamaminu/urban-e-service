import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import {Home}  from "lucide-react"


// const schema = z.object({
//   role: z.enum(["0", "1", "2", "3"]).default("0"),
//   firstName: z.string().min(1, "First Name is required"),
//   middleName: z.string().optional(),
//   lastName: z.string().min(1, "Last Name is required"),
//   dateOfBirth: z.string().min(1, "Date of Birth is required"),
//   phoneNumber: z.string().min(10, "Phone Number is required"),
//   salesID: z.string().optional(),
//   emergencyContact: z.string().min(10, "Emergency Contact is required"),
//   address: z.object({
//     street: z.string().min(1, "Street is required"),
//     city: z.string().min(1, "City is required"),
//     state: z.string().min(1, "State is required"),
//     postalCode: z.string().min(1, "Postal Code is required"),
//     country: z.string().min(1, "Country is required"), // Add country if required
//   }),
//   idCard: z.string().optional(),
//   signature: z.string().optional(),
//   agreement: z.string().min(1, "Agreement is required"),
//   profilePhoto: z.any().optional(),
//   deviceId: z.string().min(1, "Device ID is required"),
//   nationalId: z.string().min(1, "National ID is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

export default function RegisterForm({ className, ...props }) {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    // resolver: zodResolver(schema),
    defaultValues: {
      address: {},
    }
  })

  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  
  //     // Append all form data correctly
  //     Object.keys(data).forEach((key) => {
  //       if (key === "address") {
  //         // Flatten the address object into FormData
  //         Object.keys(data.address).forEach((subKey) => {
  //           formData.append(`address[${subKey}]`, data.address[subKey]);
  //         });
  //       } else if (key === "profilePhoto") {
  //         // Handle file uploads for profile photo
  //         if (data[key]?.length > 0) {
  //           formData.append(key, data[key][0]); // Assuming file input is an array
  //         }
  //       } else {
  //         formData.append(key, data[key]);
  //       }
  //     });
  
  //     const response = await axios.post(`${API_URL}/user/createUser`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  
  //     if (response.status === 201) {
  //       toast({ title: "Registration Successful", description: "Your account has been created successfully!" });
  //       navigate("/");
  //     } else {
  //       toast({ title: "Registration Failed", description: "Please try again.", variant: "destructive" });
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
  //   }
  // };
  
  
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      // Construct the user object according to the API schema
      const userData = {
        firstName: data.firstName,
        middleName: data.middleName || "",
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          country: data.address.country, // Add country if required
        },
        emergencyContact: data.emergencyContact || "",
        idCard: data.idCard || "",
        signature: data.signature || "",
        // agreement: data.agreement,
        profilePhoto: data.profilePhoto?.[0], // Assuming file input is an array
        deviceId: data.deviceId || "",
        nationalId: data.nationalId || "",
        salesID: data.salesID || "",
      };
  
      // Append the user object to FormData
      Object.keys(userData).forEach((key) => {
        if (key === "address") {
          // Flatten the address object into FormData
          Object.keys(userData.address).forEach((subKey) => {
            formData.append(`user[address][${subKey}]`, userData.address[subKey]);
          });
        } else if (key === "profilePhoto" && userData[key]) {
          // Handle file uploads for profile photo
          formData.append(`user[${key}]`, userData[key]);
        } else {
          formData.append(`user[${key}]`, userData[key]);
        }
      });
      // console.log(formData);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await axios.post(`${API_URL}/user/createUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // if (response.status === 201) {
        if (response.data.status === "success") {
        toast({ title: "Registration Successful", description: "Your account has been created successfully!" });
        navigate("/login");
      } else {
        toast({ title: "Registration Failed", 
          description: response.data.message || "Please try again.", 
          variant: "destructive" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({ title: "Error",
         description: error.response?.data?.message || "An error occurred. Please try again.",
          variant: "destructive" });
    }
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      {/* Header with Home Icon */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary">
          <Home size={24} />
          <span className="text-lg font-semibold">Home</span>
        </Link>
      </div>
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-6">
                  {[{ label: "First Name", id: "firstName" },
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
                  <div className="grid gap-2">
                    <Label htmlFor="profilePhoto">Profile Photo</Label>
                    <Input type="file" id="profilePhoto" {...register("profilePhoto")} />
                    {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto?.message}</p>}
                  </div>

                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </div>
              </form> */}
              
              <form onSubmit={handleSubmit(onSubmit)}>
  <div className="flex flex-col gap-6">
    {[
      { label: "First Name", id: "firstName", required: true },
      { label: "Middle Name", id: "middleName" },
      { label: "Last Name", id: "lastName", required: true },
      { label: "Date of Birth", id: "dateOfBirth", type: "date", required: true },
      { label: "Phone Number", id: "phoneNumber", type: "tel", required: true },
      { label: "Sales ID", id: "salesID" },
      { label: "Emergency Contact", id: "emergencyContact", type: "tel" },
      { label: "ID Card", id: "idCard" },
      { label: "Signature", id: "signature" },
      { label: "Device ID", id: "deviceId" },
      { label: "National ID", id: "nationalId" },
      { label: "Email", id: "email", type: "email", required: true },
      { label: "Password", id: "password", type: "password", required: true },
    ].map(({ label, id, type = "text", required = false }) => (
      <div key={id} className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input 
        id={id}
         type={type} 
        //  {...register(id)} />
        // {errors[id] && <p className="text-red-500 text-sm">{errors[id]?.message}</p>}
        {...register(id, {
          required: required ? `${label} is required` : false,
          ...(id === "email" && {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please enter a valid email",
            },
          }),
        })}
        />
      </div>
    ))}

    {/* Address Fields */}
    {/* <div className="grid gap-2">
      <Label htmlFor="street">Street</Label>
      <Input id="street" {...register("address.street")} />
      {errors.address?.street && <p className="text-red-500 text-sm">{errors.address.street.message}</p>}
    </div>
    <div className="grid gap-2">
      <Label htmlFor="city">City</Label>
      <Input id="city" {...register("address.city")} />
      {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city.message}</p>}
    </div>
    <div className="grid gap-2">
      <Label htmlFor="state">State</Label>
      <Input id="state" {...register("address.state")} />
      {errors.address?.state && <p className="text-red-500 text-sm">{errors.address.state.message}</p>}
    </div>
    <div className="grid gap-2">
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input id="postalCode" {...register("address.postalCode")} />
      {errors.address?.postalCode && <p className="text-red-500 text-sm">{errors.address.postalCode.message}</p>}
    </div>
    <div className="grid gap-2">
      <Label htmlFor="country">Country</Label>
      <Input id="country" {...register("address.country")} />
      {errors.address?.country && <p className="text-red-500 text-sm">{errors.address.country.message}</p>}
    </div> */}

    {/* Address Fields */}
    {[
                    { label: "Street", id: "address.street" },
                    { label: "City", id: "address.city" },
                    { label: "State", id: "address.state" },
                    { label: "Postal Code", id: "address.postalCode" },
                    { label: "Country", id: "address.country" },
                  ].map(({ label, id }) => (
                    <div key={id} className="grid gap-2">
                      <Label htmlFor={id}>{label}</Label>
                      <Input
                        id={id}
                        {...register(id, { required: `${label} is required` })}
                      />
                      {errors.address?.[id.split(".")[1]] && (
                        <p className="text-red-500 text-sm">{errors.address[id.split(".")[1]].message}</p>
                      )}
                    </div>
                  ))}

    {/* Profile Photo */}
    <div className="grid gap-2">
      <Label htmlFor="profilePhoto">Profile Photo</Label>
      <Input type="file" id="profilePhoto" {...register("profilePhoto")} />
      {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto?.message}</p>}
    </div>

    <Button type="submit" className="w-full">
      Register
    </Button>
    {/* Already have an account? */}
    <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Log in
                  </Link>
                </p>
  </div>
</form>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
