

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
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as base64js from 'base64-js';


function PlanAgreementForm() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [currentStep, setCurrentStep] = useState(1);

  const [files, setFiles] = useState({ file1: null, file2: null, file3: null });

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const { control, handleSubmit, setValue, watch, reset } = useForm();



  const { toast } = useToast();
  const [plotNumber, setPlotNumber] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Cookie not found
  };

// Convert file to base64 using base64-js
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    reader.onload = () => {
      const buffer = new Uint8Array(reader.result);
      const base64String = base64js.fromByteArray(buffer); // Convert to base64 with base64-js
      resolve(`data:${file.type};base64,${base64String}`); // Add data URI prefix
    };
    reader.onerror = (error) => reject(error);
  });


  const onSubmit = async (data) => {
    debugger;
    try {
      const formData = watch(); // Watch collects all data from all steps
      toast({ description: 'Form Submitted!' });
      console.log('Form data:', data);
  
      // Step 1: Verify token existence
      const token = getCookie('accessToken');
      if (!token) {
        throw new Error('No access token found. Please log in again.');
      }
      console.log('Token:', token); // Log token to verify it’s not undefined or empty
  
      const userPayload = JSON.parse(localStorage.getItem('userPayload'));
      if (!userPayload || !userPayload.id) {
        throw new Error('User payload not found or invalid.');
      }
      const theuserid = userPayload.id;
      console.log('User ID:', theuserid);
  

      // Prepare files for upload
      const filesToUpload = await Promise.all(
        uploadedFiles.map(async (file) => {
          const base64Data = await fileToBase64(file);
          return {
            fileName: file.name,
            base64Data: base64Data,
          };
        })
      );
      const payload = {
        serviceId: "67a8b6367790b30993406c31",
        subServiceId: "67a8b7097790b30993406c36",
        applicationDetails: formData,
        files: filesToUpload,
      };
  
      // Step 2: Submit the application
      const apiUrl = `${API_URL}/application/apply`;
      console.log('Submitting to:', apiUrl);
      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ensure no extra spaces
        }
      });
  
      const result = response.data; // axios already parses JSON
      console.log('applicationId', result.payment.applicationId)
      console.log('Submission result:', result);
      localStorage.setItem("applicationId", response.data.token)
  
      if (response.status === 201) {
        toast({ description: 'Service application submitted successfully!' });
  
        
      } else {
        throw new Error(`Submission failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Full error:', error); // Log full error object for debugging
      if (error.response) {
        // Server responded with a status like 401 or 403
        console.error('Server Error:', error.response.data);
        toast({ description: `Error: ${error.response.data.message || 'Unauthorized'}` });
      } else if (error.request) {
        console.error('No response from server');
        toast({ description: 'No response from server. Check your connection.' });
      } else {
        console.error('Request setup error:', error.message);
        toast({ description: `Error: ${error.message}` });
      }
    }
  };


  const handleSearch = async (plotNumber) => {
    try {
      plotNumber = plotNumber.toUpperCase()
debugger;
      const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userPayload = JSON.parse(localStorage.getItem('userPayload'));
  const theuserid = userPayload.id;

      const response = await axios.get(`${API_URL}/plot?plotNumber=${plotNumber}`);
      const data = response.data;

      if (data.status === 'success' && data.plots.length > 0) {
        const plot = data.plots.find(p => p.plotNumber === plotNumber);
        
        if (plot) {
          setValue('city', plot.address.region);
          setValue('subCity', plot.address.subCity);
          setValue('wereda', plot.address.woreda);
          setValue('streetNumber', plot.address.kebele);
          setValue('houseNumber', plot.address.houseNumber);
          setValue('plotNumber', plot.plotNumber);
          setIsDisabled(true);
          toast({ description: 'Data retrieved successfully!' });
        } else {
          reset();
          setIsDisabled(false);
          toast({ description: 'No data found for this plot number.' });
        }
      } else {
        reset();
        setIsDisabled(false);
        toast({ description: 'No data found.' });
      }
    } catch (error) {
      console.error('Error fetching plot data:', error);
      toast({ description: 'Failed to fetch data from the server.' });
    }
  };



  const StepContent = () => {
    switch (currentStep) {
      case 1:

      return (
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 1: The address where the construction will take place
          </h3>

          <div className="flex justify-between items-center gap-4">
          <Controller
          name="plotNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Parcel ID"
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
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
  <div>
    <div className='pb-2'>
    <Controller
      control={control}
      name="city"
      
      render={({ field }) => (
        <Input {...field} type="text" placeholder="City" disabled /> // disabled={isDisabled} />
      )}
    />
    </div>
    <div className='pb-2'>
    <Controller
      control={control}
      name="wereda"
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Wereda/Kebele" disabled /> // disabled={isDisabled} />
      )}
    />
    </div>
    <div className='pb-2'>
    <Controller
      control={control}
      name="houseNumber"
      render={({ field }) => (
        <Input {...field} type="text" placeholder="House Number" disabled /> // disabled={isDisabled} />
      )}
    />
    </div>
  </div>
  <div>
    <div className='pb-2'>
    <Controller
      control={control}
      name="subCity"
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Sub City" disabled /> //disabled={isDisabled} />
      )}
    />
    </div>
    <div className='pb-2'>
    <Controller
      control={control}
      name="streetNumber"
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Street Number" disabled /> // disabled={isDisabled} />
      )}
    />
    </div>
     <Controller
      control={control}
      name="plotNumber"
      render={({ field }) => (
        <Input {...field} type="text" placeholder="Plot Number" disabled /> //  disabled={isDisabled} />
      )}
    />
  </div>
</form>

        </div>
      );
   
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 2: Construction services for which the Plan Agreement is requested
    </h3>

    <Controller
              name="buildingService"
              control={control}
              render={({ field }) => (
                <Select {...field}>
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
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

<div className="text-center text-sm ">
    Height and Depth of the building in meters.
  </div>
                <div className="flex justify-between items-center gap-4">
                <Input type="text" placeholder="Height above the ground" {...control.register('heightAboveGround')} />
                <Input type="text" placeholder="Depth below the ground" {...control.register('depthBelowGroundInMeters')} />
                </div>
                <div className="text-center text-sm ">
    Number of floors
  </div>
                <div className="flex justify-between items-center gap-4">
                <Input type="text" placeholder="Above ground" {...control.register('numberOfFloorsAboveGround')} />
                <Input type="text" placeholder="Below ground" {...control.register('numberOfFloorsBelowGround')} />
                </div>
                
                

          
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 3: The type of construction for which Plan's consent is requested
    </h3>
    <Controller
              name="buildingType"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Building Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="improvement">Improvement /Expansion</SelectItem>
                      <SelectItem value="extension">Building Permit Extension</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

    <Input type="text" placeholder="Building Permit number" {...control.register('previousPermit')} />


    {/* Date of issue of the permit
    <Input type="date" placeholder="Previous building permit number, if existing"/> */}

    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date of issue of building permit</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" {...control.register('permitDate')} />
                </div>

                <Input type="text" placeholder="Construction cost" {...control.register('constructionCost')} />
                {/* <Input type="text" placeholder="Number of floors" {...control.register('floors')} />
                <Input type="text" placeholder="Height above ground in meters" {...control.register('heightAboveGround')} />
                <Input type="text" placeholder="Number of floors below ground" {...control.register('numberOfFloorsBelowGround')} />
                <Input type="text" placeholder="Depth below ground in meters" {...control.register('depthBelowGroundInMeters')} /> */}

                {/* <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Detailed description of construction content on the boundary</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div> */}


          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 4: If the Requested Plan's Consent is New 
    </h3>
    {/* <Input type="text" placeholder="Name" {...control.register('consultingFirmName')} />
                <Input type="text" placeholder="Level" {...control.register('firmLevel')} />
                <Input type="text" placeholder="Address" {...control.register('firmAddress')} />
                <Input type="tel" placeholder="Phone Number" {...control.register('firmPhone')} /> */}
            
                {/* <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Type of design submitted for building permit</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div> */}



    {/* <div className="items-top flex space-x-2">
      <Checkbox id="terms1" {...control.register('terms')} />
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
    </div> */}


    {/* <Input type="text" placeholder="Name of the applicant for the building permit" {...control.register('nameOfApplicant')} />
    <Input type="text" placeholder="Phone Number" {...control.register('phoneNumber')}/>
    <Input type="text" placeholder="TIN Number" {...control.register('tinNumber')}/>
    <Input type="text" placeholder="Sign" {...control.register('sign')}/>
    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" {...control.register('dateOfIssueOfPermit')} />
                </div> */}


<Card className="w-full max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Select Build Type</h3>
      </CardHeader>
      <CardContent>
        <RadioGroup {...control.register("buildType")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="builtOneByOne" value="one_by_one" />
            <label
              htmlFor="builtOneByOne"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Built one by one
            </label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <RadioGroupItem id="builtOnce" value="once" />
            <label
              htmlFor="builtOnce"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Built once
            </label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>


    <div>
    <Label htmlFor="tenure" className="my-2" >Date of issue of building permit</Label>
    <Input className="my-2" id="tenure" type="text" placeholder="Tenure Certificate Number" {...control.register('tenureCertNum')} />
    </div>

    <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Step 5: Upload Required Documents
            </h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="file1">Document 1</Label>
                <Input
                  id="file1"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'file1')}
                />
              </div>
              <div>
                <Label htmlFor="file2">Document 2</Label>
                <Input
                  id="file2"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'file2')}
                />
              </div>
              <div>
                <Label htmlFor="file3">Document 3</Label>
                <Input
                  id="file3"
                  type="file"
                  onChange={(e) => handleFileChange(e, 'file3')}
                />
              </div>
            </div>
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
          <h2 className="scroll-m-20  pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-primary">
          Plan Agreement Form
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

          <form onSubmit={(e) => e.preventDefault()}>
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
            {/* <Button
              onClick={nextStep}
              // disabled={currentStep === 4}
            >
              {currentStep === 4 ? 'Submit' : 'Next'}
            </Button> */}
            <Button
                type={currentStep === 4 ? 'submit' : 'button'}
                onClick={currentStep !== 4 ? nextStep : onSubmit}
              >
                {currentStep === 4 ? 'Submit' : 'Next'}
              </Button>
          </div>
          </form>
        </CardContent>
      </Card>





    </div>
  );
}

export default PlanAgreementForm;


export function FileUploadSection({ applicationId }) {
  const [files, setFiles] = useState([null, null, null]);
  const { toast } = useToast();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (index) => (event) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0];
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    try {
      const token = getCookie('accessToken');
      const formData = new FormData();

      files.forEach((file, index) => {
        if (file) {
          formData.append(`file${index}`, file);
        }
      });
      formData.append('applicationId', applicationId);

      const response = await axios.post(
        `${API_URL}/application/upload-files`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({ description: 'Files uploaded successfully!' });
        setFiles([null, null, null]); // Reset files after successful upload
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast({ 
        description: error.response?.data?.message || 'Failed to upload files',
        variant: 'destructive'
      });
    }
  }}