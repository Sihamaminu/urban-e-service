

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

import { useToast } from "@/hooks/use-toast"

import { useForm, Controller } from 'react-hook-form';


function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const { control, handleSubmit, setValue, watch, reset } = useForm();

  const { toast } = useToast();
  const [plotNumber, setPlotNumber] = useState('');
  // const [formData, setFormData] = useState({
  //   city: '',
  //   subCity: '',
  //   wereda: '',
  //   streetNumber: '',
  //   houseNumber: ''
  // });
  const [isDisabled, setIsDisabled] = useState(false);

  // Dummy data for mocking API response
  const dummyData = {
    '1234': {
      city: 'Addis Ababa',
      subCity: 'Bole',
      wereda: 'Wereda 5',
      streetNumber: 'Street 12',
      houseNumber: '45A'
    },
    '5678': {
      city: 'Adama',
      subCity: 'Asella',
      wereda: 'Wereda 8',
      streetNumber: 'Street 7',
      houseNumber: '67B'
    }
  };

  const onSubmit = (data) => {
    // You can handle form submission logic here
    toast({ description: 'Form Submitted!' });
    console.log(data);
  };

  const handleSearch = (plotNumber) => {
    debugger;
    if (dummyData[plotNumber]) {
      setValue('city', dummyData[plotNumber].city);
      setValue('subCity', dummyData[plotNumber].subCity);
      setValue('wereda', dummyData[plotNumber].wereda);
      setValue('streetNumber', dummyData[plotNumber].streetNumber);
      setValue('houseNumber', dummyData[plotNumber].houseNumber);
      setIsDisabled(true);
      toast({ description: 'Data retrieved successfully!' });
    } else {
      reset();
      setIsDisabled(false);
      toast({ description: 'No data found for this plot number.' });
    }
  };

  // const handleSearch = () => {
  //   debugger;
  //   if (dummyData[plotNumber]) {
  //     setFormData(dummyData[plotNumber]);
  //     setIsDisabled(true);
  //     toast({ description: 'Data retrieved successfully!' });
  //   } else {
  //     toast({ description: 'No data found for this plot number.' });
  //     setFormData({
  //       city: '',
  //       subCity: '',
  //       wereda: '',
  //       streetNumber: '',
  //       houseNumber: ''
  //     });
  //     setIsDisabled(false);
  //   }
  // };

  const StepContent = () => {
    switch (currentStep) {
      case 1:

      return (
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 1: The address where the construction will take place
          </h3>

          <Controller
          name="plotNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Plot Number"
              onChange={(e) => {
                setValue('plotNumber', e.target.value); 
                // Handle onChange only for plotNumber input, 
                // rest of the form will be handled by react-hook-form
                field.onChange(e);

              }}
              value = {field.value}
            />
          )}
        />
          {/* <Input
            type="text"
            placeholder="Plot Number"
            value={plotNumber}
            onChange={(e) =>{
              e.preven
              setPlotNumber(e.target.value)
            }}
          /> */}
          <Button
            variant="outline"
            onClick={() => handleSearch(watch('plotNumber'))}
          >
            Search
          </Button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="City"
                  disabled={isDisabled}
                />
              )}
            />
            <Controller
              control={control}
              name="subCity"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Sub City"
                  disabled={isDisabled}
                />
              )}
            />
            <Controller
              control={control}
              name="wereda"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Wereda/Kebele"
                  disabled={isDisabled}
                />
              )}
            />
            <Controller
              control={control}
              name="streetNumber"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Street Number"
                  disabled={isDisabled}
                />
              )}
            />
            <Controller
              control={control}
              name="houseNumber"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="House Number"
                  disabled={isDisabled}
                />
              )}
            />
          </form>
        </div>
      );
    //     return (
    //       <div className="space-y-4">
    //         <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    //         Step 1: The address where the construction will take place
    // </h3>
    //                       <Input
    //                        type="text"
    //                        placeholder="Plot Number"
    //                        value={plotNumber}
    //                        onChange={(e) => 
    //                         setPlotNumber(e.target.value)
    //                       }
    //                      />
    //                      {/* <Button onClick={handleSearch} className="mt-2">
    //     Search
    //   </Button> */}
    //   <Button
    //   variant="outline"
    //   onClick={handleSearch}
    // >
    //   Show Toast
    // </Button>
    //                        <Input
    //                        type="text"
    //                        placeholder="City"
    //                        value={formData.city}
    //                        disabled
    //                        onChange={(e) => setFormData({ ...formData, city: e.target.value})}
    //                      />
    //                      <Input
    //                        type="text"
    //                        placeholder="Sub City"
    //                        value={formData.subCity}
    //                       disabled //={isDisabled}
    //                       onChange={(e) => setFormData({ ...formData, subCity: e.target.value })}
    //                      />
    //                      <Input
    //                        type="text"
    //                        placeholder="Wereda/ Kebele"
    //                        value={formData.wereda}
    //                       disabled //={isDisabled}
    //                       onChange={(e) => setFormData({ ...formData, wereda: e.target.value })}
    //                      />
    //                      <Input
    //                        type="text"
    //                        placeholder="Street Number"
    //                        value={formData.streetNumber}
    //                       disabled //={isDisabled}
    //                       onChange={(e) => setFormData({ ...formData, streetNumber: e.target.value })}
    //                      />
    //                      <Input
    //                        type="text"
    //                        placeholder="House Number"
    //                        value={formData.houseNumber}
    //                       disabled //={isDisabled}
    //                       onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
    //                      />
            
            
    //       </div>
    //     );
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
          <SelectItem value="infrastructure">Infrastructure</SelectItem>
          <SelectItem value="others">Others</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    

            {/* <Input placeholder="Building Height (m)" />
            <Input placeholder="Underground (m)" />
            <Input placeholder="Floors Above Ground" />
            <Input placeholder="Underground" /> */}
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
          <SelectLabel></SelectLabel>
          <SelectItem value="house">New</SelectItem>
          <SelectItem value="shop">Improvement /Expansion</SelectItem>
          <SelectItem value="shop">Building Permit Extension</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Input type="text" placeholder="Previous building permit number, if existing"/>


    {/* Date of issue of the permit
    <Input type="date" placeholder="Previous building permit number, if existing"/> */}

    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date of issue of building permit</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" />
                </div>

                <Input type="text" placeholder="Construction cost"/>
                <Input type="text" placeholder="Number of floors"/>
                <Input type="text" placeholder="Height above ground in meters"/>
                <Input type="text" placeholder="Number of floors below ground"/>
                <Input type="text" placeholder="Depth below ground in meters"/>

                <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Detailed description of construction content on the boundary</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>


          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 4: The Consulting Firm
    </h3>
    <Input type="text" placeholder="Name"/>
                <Input type="text" placeholder="Level"/>
                <Input type="text" placeholder="Address"/>
                <Input type="tel" placeholder="Phone Number"/>
            
                

                <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Type of design submitted for building permit</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>



    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>


    <Input type="text" placeholder="Name of the applicant for the building permit"/>
    <Input type="text" placeholder="Phone Number"/>
    <Input type="text" placeholder="TIN Number"/>
    <Input type="text" placeholder="Sign"/>
    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" />
                </div>
            
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
          Building Permit Application
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

export default StepperForm;