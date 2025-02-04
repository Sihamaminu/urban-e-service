// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";

// // export default function StepperForm() {
// //   const [step, setStep] = useState(1);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleNext = () => setStep((prev) => prev + 1);
// //   const handleBack = () => setStep((prev) => prev - 1);
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form Data:", formData);
// //     alert("Form Submitted!");
// //   };

// //   return (
// //     <Card className="max-w-md mx-auto mt-4 shadow-xl">
// //       <CardHeader>
// //         <CardTitle>Step {step} of 3</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit}>
// //           {step === 1 && (
// //             <div className="grid gap-4">
// //               <Label>Name</Label>
// //               <Input
// //                 type="text"
// //                 name="name"
// //                 placeholder="Enter your name"
// //                 value={formData.name}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           )}

// //           {step === 2 && (
// //             <div className="grid gap-4">
// //               <Label>Email</Label>
// //               <Input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Enter your email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           )}

// //           {step === 3 && (
// //             <div className="grid gap-4">
// //               <Label>Password</Label>
// //               <Input
// //                 type="password"
// //                 name="password"
// //                 placeholder="Enter your password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           )}

// //           <div className="flex justify-between mt-4">
// //             {step > 1 && (
// //               <Button variant="outline" onClick={handleBack} type="button">
// //                 Back
// //               </Button>
// //             )}
// //             {step < 3 ? (
// //               <Button onClick={handleNext} type="button">
// //                 Next
// //               </Button>
// //             ) : (
// //               <Button type="submit">Submit</Button>
// //             )}
// //           </div>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// export default function StepperForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     dob: "",
//     gender: "",
//     interests: [],
//     country: "",
//     bio: "",
//     file: null,
//   });

//   const handleNext = () => setStep((prev) => prev + 1);
//   const handleBack = () => setStep((prev) => prev - 1);
  
//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setFormData((prevData) => ({
//         ...prevData,
//         interests: checked
//           ? [...prevData.interests, value]
//           : prevData.interests.filter((interest) => interest !== value),
//       }));
//     } else if (type === "file") {
//       setFormData({ ...formData, file: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data:", formData);
//     alert("Form Submitted!");
//   };

//   return (
//     <Card className="max-w-md mx-auto mt-4 shadow-xl">
//       <CardHeader>
//         <CardTitle>Step {step} of 4</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           {/* Step 1: Basic Info */}
//           {step === 1 && (
//             <div className="grid gap-4">
//               <Label>Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />

//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           )}

//           {/* Step 2: Personal Details */}
//           {step === 2 && (
//             <div className="grid gap-4">
//               <Label>Date of Birth</Label>
//               <Input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 required
//               />

//               <Label>Gender</Label>
//               <RadioGroup
//                 name="gender"
//                 value={formData.gender}
//                 onValueChange={(value) => setFormData({ ...formData, gender: value })}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="male" id="male" />
//                   <Label htmlFor="male">Male</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="female" id="female" />
//                   <Label htmlFor="female">Female</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           )}

//           {/* Step 3: Interests & Country */}
//           {step === 3 && (
//             <div className="grid gap-4">
//               <Label>Interests</Label>
//               <div className="flex gap-4">
//                 <Checkbox
//                   name="interests"
//                   value="coding"
//                   checked={formData.interests.includes("coding")}
//                   onChange={handleChange}
//                 />
//                 <Label>Coding</Label>

//                 <Checkbox
//                   name="interests"
//                   value="design"
//                   checked={formData.interests.includes("design")}
//                   onChange={handleChange}
//                 />
//                 <Label>Design</Label>

//                 <Checkbox
//                   name="interests"
//                   value="gaming"
//                   checked={formData.interests.includes("gaming")}
//                   onChange={handleChange}
//                 />
//                 <Label>Gaming</Label>
//               </div>

//               <Label>Country</Label>
//               <Select
//                 onValueChange={(value) => setFormData({ ...formData, country: value })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your country" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="usa">USA</SelectItem>
//                   <SelectItem value="canada">Canada</SelectItem>
//                   <SelectItem value="india">India</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//           {/* Step 4: Bio & File Upload */}
//           {step === 4 && (
//             <div className="grid gap-4">
//               <Label>Bio</Label>
//               <Textarea
//                 name="bio"
//                 placeholder="Tell us about yourself..."
//                 value={formData.bio}
//                 onChange={handleChange}
//               />

//               <Label>Upload File</Label>
//               <Input
//                 type="file"
//                 name="file"
//                 onChange={handleChange}
//               />
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-4">
//             {step > 1 && (
//               <Button variant="outline" onClick={handleBack} type="button">
//                 Back
//               </Button>
//             )}
//             {step < 4 ? (
//               <Button onClick={handleNext} type="button">
//                 Next
//               </Button>
//             ) : (
//               <Button type="submit">Submit</Button>
//             )}
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <Label>Personal Information</Label>
            <Input placeholder="City" />
            <Input placeholder="Sub City" />
            <Input placeholder="Wereda/ Kebele" />
            <Input placeholder="House Number" />
            <Input placeholder="Plot Number" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>Contact Details</Label>
            <Label>Service Type</Label>
            <RadioGroup defaultValue="private-residence">
              {["Private Residence", "Shop", "Office", "Hotel", "Manufacturing", "Apartment", "Warehouse", "Health institution", "Educational Institution", "Others"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.toLowerCase()} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <Input placeholder="The height of the building above the ground in meters" />
            <Input placeholder="Underground in meters" />
            <Input placeholder="The number of floors above the ground" />
            <Input placeholder="Underground" />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label>Account Details</Label>
            <Input placeholder="Username" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <Label>Confirmation</Label>
            <p>Thank you for completing the form!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Stepper Form</h1>

          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold ${
                    step <= currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 w-14 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <StepContent />
          </div>

          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className={currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
            >
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === 4}
              className={currentStep === 4 ? "opacity-50 cursor-not-allowed" : ""}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StepperForm;
