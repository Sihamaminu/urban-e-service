
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Label } from "@/components/ui/label"


function TestComponent() {
 const [currentStep, setCurrentStep] = useState(1);
 
   const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
   const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);
 
   const StepContent = () => {
     switch (currentStep) {
       case 1:
         return (
           <div className="space-y-4">
             <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
             Step 1: The address where the construction will take place
     </h3>
             <Input
               type="text"
               placeholder="Plot Number"
             />
               <Input
               type="text"
               placeholder="City"
             />
             <Input
               type="text"
               placeholder="Sub City"
             />
             <Input
               type="text"
               placeholder="Wereda/ Kebele"
             />
             <Input
               type="text"
               placeholder="Street Number"
             />
             <Input
               type="text"
               placeholder="House Number"
             />
             
             
           </div>
         );
       case 2:
         return (
           <div className="space-y-4">
             <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
             Step 2: Construction services for which the Plan Agreement is requested
     </h3>

     <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a service" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Building Service</SelectLabel>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="shop">Shop</SelectItem>
          <SelectItem value="office">Office</SelectItem>
          <SelectItem value="hotel">Hotel</SelectItem>
          <SelectItem value="manufacturing">Manufacturing</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="warehouse">Warehouse</SelectItem>
          <SelectItem value="healthcare">Health Care</SelectItem>
          <SelectItem value="hotel">School</SelectItem>
          <SelectItem value="others">Others</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     
             <Input placeholder="Building Height (m)" />
             <Input placeholder="Underground (m)" />
             <Input placeholder="Floors Above Ground" />
             <Input placeholder="Underground" />
           </div>
         );
       case 3:
         return (
           <div className="space-y-4">
             <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
             Step 3: The type of construction for which Plan's consent is requested
     </h3>

     <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Building Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Building Type</SelectLabel>
          <SelectItem value="newbuilding">New Building</SelectItem>
          <SelectItem value="improvementexpansion">Improvement/ Expansion</SelectItem>
          <SelectItem value="servicechange">Service change</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

             <Input type="email" placeholder="Bulding Permit Number" />
             <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="date">Date of issue of building permit</Label>
            <Input type="date" id="date" placeholder="Date of issue of building permit" />
            </div>

            <Input type="email" placeholder="Bulding Cost" />

           </div>
         );
       case 4:
         return (
            <div className="space-y-4">
             <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
             Step 4: If the construction for which Plan's consent is requested is new.

     </h3>

     <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Building Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel> </SelectLabel>
          <SelectItem value="newbuilding">Completely built in one go</SelectItem>
          <SelectItem value="improvementexpansion">Step by step construction</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

     <Input type="email" placeholder="Proof of ownership document number" />


           {/* <div className="text-center p-4">
             <p className="text-lg font-medium">Review and Submit</p>
             <p className="text-muted-foreground text-sm mt-2">
             If the construction for which Plin\'s consent is requested is new.
             </p> */}
           </div>
         );
       default:
         return null;
     }
   };
 
   return (
     <div className=" flex items-center justify-center p-4">
       <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle className="text-center">
           <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
           Demolition Permit Application
     </h2>
           </CardTitle>
         </CardHeader>
         <Separator />
         <CardContent className="pt-6">
           <div className="flex justify-between items-center mb-8">
             {[1, 2, 3, 4].map((step) => (
               <React.Fragment key={step}>
                 <div className="flex flex-col items-center">
                   <Button
                     variant="ghost"
                     size="sm"
                     className={`h-8 w-8 rounded-full p-0 ${
                       step <= currentStep
                         ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                         : 'bg-muted text-muted-foreground'
                     }`}
                     aria-label={`Step ${step}`}
                   >
                     {step}
                   </Button>
                 </div>
                 {step < 4 && (
                   <div
                     className={`flex-1 h-[2px] ${
                       step < currentStep ? 'bg-primary' : 'bg-muted'
                     }`}
                     aria-hidden="true"
                   />
                 )}
               </React.Fragment>
             ))}
           </div>
 
           <StepContent />
 
           <div className="mt-8 flex justify-between">
             <Button
               variant="secondary"
               onClick={prevStep}
               disabled={currentStep === 1}
               className={currentStep === 1 ? 'invisible' : ''}
             >
               Previous
             </Button>
             <Button
               onClick={nextStep}
               disabled={currentStep === 4}
             >
               {currentStep === 4 ? 'Submit' : 'Next'}
             </Button>
           </div>
         </CardContent>
       </Card>
     </div>
   );
}

export default TestComponent