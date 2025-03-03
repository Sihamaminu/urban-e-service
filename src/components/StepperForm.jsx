import React, { useState, useEffect } from 'react';
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
import PaymentForm from './PaymentForm';
import BuildingPermitCertificate from './BuildingPermitCertificate';
import { Commet } from 'react-loading-indicators';
import PlanAgreementForm from './PlanAgreementForm';
import BuildingPermitCertrificate from './BuildingPermitCertificate';
import FileUploadForm from './FileUploadForm';


function StepperForm() {

  //
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [workflowSteps, setWorkflowSteps] = useState([]);  

  const [hasData, setHasData] = useState(false);

  //

  const API_URL = import.meta.env.VITE_API_URL;

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const { control, handleSubmit, setValue, watch, reset } = useForm();



  const { toast } = useToast();
  const [plotNumber, setPlotNumber] = useState('');

  const [isDisabled, setIsDisabled] = useState(false);


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Cookie not found
  };


  const onSubmit = async (data) => {
    try {

    const formData = watch(); // Watch collects all data from all steps
    // You can handle form submission logic here
    toast({ description: 'Form Submitted!' });
    console.log(data);

    const token = getCookie('accessToken');
    // const token = localStorage.getItem('accessToken');
    const userPayload = JSON.parse(localStorage.getItem('userPayload'));
    const theuserid = userPayload.id;

    const userIdFromLocal = localStorage.getItem("userId");

    const payload = {
      userId : userIdFromLocal,
      serviceId:   "67a8b6367790b30993406c31", //formData.serviceId,  // Replace with your actual form field name
      subServiceId:  "67a8b7097790b30993406c36", //formData.subServiceId,  // Replace with your actual form field name
      // applicationCode: "APP123456",
      applicationDetails: formData  // Replace with your actual form field name
    };

    var apiUrl = `${API_URL}/application/apply`; //?userId=${theuserid}`
    const response = await axios.post(apiUrl, payload, {
      // method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // If your API requires token authentication
        'x-access-token': token
      },
      body: JSON.stringify(payload)
    });

    const result = await response.data; //json();

    if (response.status == 201) {
      toast({ description: 'Service application submitted successfully!' });
      console.log('Success:', result);
    } else {
      toast({ description: `Error: ${result.message}` });
      console.error('Error:', result);
    }
    
    // Reset the form after submission
    reset();
    setCurrentStep(1);
    setIsDisabled(false);
    } catch (error) {
      console.error('Submission Error:', error);
    toast({ description: 'An error occurred while submitting the form.' });
    }

  };


  const handleSearch = async (plotNumber) => {
    try {
      plotNumber = plotNumber.toUpperCase()
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



  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        // const userId = "67a663226d5844cad732d0b5"; // Replace with dynamic user ID
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${API_URL}/application/user/${userId}`);
        const data = response.data;

        if (data.status === "success" && data.applications.length > 0) {
          const application = data.applications[0]; // Assuming only one application is relevant
          const { currentStep, workflowSteps } = application;

          setWorkflowSteps(workflowSteps); 

          const currentWorkflowStep = workflowSteps.find(step => step.stepName === currentStep.toString());

          setCurrentStep(parseInt(currentWorkflowStep));

          if (currentWorkflowStep && currentWorkflowStep.status === "Approved") {
            setIsApproved(true);
          }

          setHasData(true);
        }
      } catch (error) {
        setIsApproved(false);
        setIsloading(false);
        setHasData(false);
        console.error("Error fetching application status:", error);
        toast({ description: "Failed to fetch application status." });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, []);

  // if (loading) return  <p>Loading...</p>;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Commet color="#32cd32" size="medium" text="Loading..." textColor="" />
      </div>
    );
  
  const StepContent = () => {
    switch (currentStep) {
      case 1:

      return (
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 1: Address where construction will take place
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
        <Input {...field} type="text" placeholder="Sub City" disabled /> // disabled={isDisabled} />
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
            <Input {...field} type="text" placeholder="Plot Number" disabled /> // disabled={isDisabled} />
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
            Step 2: Construction Service for which a Building Permit is requested
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
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

          
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 3: Building Type
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

    <Input type="text" placeholder="Previous building permit number, if existing" {...control.register('previousPermit')} />


    {/* Date of issue of the permit
    <Input type="date" placeholder="Previous building permit number, if existing"/> */}

    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date of issue of building permit</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" {...control.register('permitDate')} />
                </div>

                <Input type="text" placeholder="Construction cost" {...control.register('constructionCost')} />


                <div  className="grid w-full gap-1.5">
                <Input type="text" placeholder="Number of floors" {...control.register('floors')} />
                <Input type="text" placeholder="Height above ground in meters" {...control.register('heightAboveGround')} />
                </div>


                <Input type="text" placeholder="Number of floors below ground" {...control.register('numberOfFloorsBelowGround')} />
                <Input type="text" placeholder="Depth below ground in meters" {...control.register('depthBelowGroundInMeters')} />

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
    <Input type="text" placeholder="Name" {...control.register('consultingFirmName')} />
                <Input type="text" placeholder="Level" {...control.register('firmLevel')} />
                <Input type="text" placeholder="Address" {...control.register('firmAddress')} />
                <Input type="tel" placeholder="Phone Number" {...control.register('firmPhone')} />
            
                

                <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Type of design submitted for building permit</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>



    <div className="items-top flex space-x-2">
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
    </div>


    <Input type="text" placeholder="Name of the applicant for the building permit" {...control.register('nameOfApplicant')} />
    <Input type="text" placeholder="Phone Number" {...control.register('phoneNumber')}/>
    <Input type="text" placeholder="TIN Number" {...control.register('tinNumber')}/>
    <Input type="text" placeholder="Sign" {...control.register('sign')}/>
    <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" placeholder="Date of issue of building permit" {...control.register('dateOfIssueOfPermit')} />
                </div>
            
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div>
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Commet color="#32cd32" size="medium" text="Loading..." textColor="" />
        </div>
      ) : !hasData ? (
        // Default Case: Show Permit Application Form if no data or pending
        <div>
          <PlanAgreementForm />
        </div>
      ) : workflowSteps[0]?.status === "Pending" ? (
        // Step 1: Waiting for Approval (Step 1 Pending)
        // <div className="flex flex-col items-center justify-center h-screen">
        //   <FileUploadForm />
        // </div>
        <div className="flex flex-col items-center justify-center h-screen">
                 <PlanAgreementForm />
          {/* <h2 className="text-xl font-semibold">Step 1: Waiting for Approval</h2>
          <p className="text-gray-500">Your application is currently under review for Step 1.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh Status
          </Button> */}
        </div>
      ) : workflowSteps[1]?.status === "Pending" ? (
        // Step 2: Waiting for Approval (Step 2 Pending)
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-semibold">Step 2: Waiting for Approval</h2>
          <p className="text-gray-500">Your application is currently under review for Step 2.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh Status
          </Button>
        </div>
      ) : workflowSteps[2]?.status === "Pending" ? (
        // Step 3: Waiting for Approval (Step 3 Pending)
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-semibold">Step 3: Waiting for Approval</h2>
          <p className="text-gray-500">Your application is currently under review for Step 3.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh Status
          </Button>
        </div>
      ) : currentStep === 1 && isApproved ? (
        // Case 2: Show Payment Form (Step 1 Approved)
        <PaymentForm />
      ) : currentStep === 2 && isApproved ? (
        // Case 3: Show Certificate (Step 2 Approved)
        <BuildingPermit />
      ) : (
        // Default Fallback: General Waiting for Approval
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-semibold">Waiting for Approval</h2>
          <p className="text-gray-500">Your application is currently under review.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Refresh Status
          </Button>
        </div>
      )}
    </div>
  );
  
  
  // return (
  //   <div>
  //     {/* Loading State */}
  //     {loading ? (
  //        <div className="flex justify-center items-center min-h-screen">
  //        <Commet color="#32cd32" size="medium" text="Loading..." textColor="" />
  //      </div>
  //     ) : (
  //       // Default Case: Show Permit Application Form if no data or pending
  //       !hasData) ? (
  //         // <div className="flex items-center justify-center p-4">
  //         //   <Card className="w-full max-w-md">
  //         //     <CardHeader>
  //         //       <CardTitle className="text-center">
  //         //         <h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0 text-primary">
  //         //           Building Permit Application
  //         //         </h2>
  //         //       </CardTitle>
  //         //     </CardHeader>
  //         //     <Separator />
  //         //     <CardContent className="pt-6">
  //         //       {/* Progress Indicator */}
  //         //       <div className="flex justify-between items-center mb-8">
  //         //         {[1, 2, 3, 4].map((step) => (
  //         //           <React.Fragment key={step}>
  //         //             <div className="flex flex-col items-center">
  //         //               <Button
  //         //                 variant="ghost"
  //         //                 size="sm"
  //         //                 className={`h-8 w-8 rounded-full p-0 ${
  //         //                   step <= currentStep
  //         //                     ? "bg-primary text-primary-foreground hover:bg-primary/90"
  //         //                     : "bg-muted text-muted-foreground"
  //         //                 }`}
  //         //                 aria-label={`Step ${step}`}
  //         //               >
  //         //                 {step}
  //         //               </Button>
  //         //             </div>
  //         //             {step < 4 && (
  //         //               <div
  //         //                 className={`flex-1 h-[2px] ${
  //         //                   step < currentStep ? "bg-primary" : "bg-muted"
  //         //                 }`}
  //         //                 aria-hidden="true"
  //         //               />
  //         //             )}
  //         //           </React.Fragment>
  //         //         ))}
  //         //       </div>

  //         //       {/* Form Content */}
  //         //       <form onSubmit={(e) => e.preventDefault()}>
  //         //         <StepContent />

  //         //         <div className="mt-8 flex justify-between">
  //         //           <Button
  //         //             variant="secondary"
  //         //             onClick={prevStep}
  //         //             disabled={currentStep === 1}
  //         //             className={currentStep === 1 ? "invisible" : ""}
  //         //           >
  //         //             Previous
  //         //           </Button>
  //         //           <Button
  //         //             type={currentStep === 4 ? "submit" : "button"}
  //         //             onClick={currentStep !== 4 ? nextStep : onSubmit}
  //         //           >
  //         //             {currentStep === 4 ? "Submit" : "Next"}
  //         //           </Button>
  //         //         </div>
  //         //       </form>
  //         //     </CardContent>
  //         //   </Card>
  //         // </div>
  //         <div>
  //           <PlanAgreementForm  />
  //           </div>
  //       ) : 
        
  //       workflowSteps.every((step) => step.status === "Pending") ? (
  //         // Case: All Workflow Steps are Pending
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <h2 className="text-xl font-semibold">Waiting for Approval</h2>
  //       <p className="text-gray-500">Your application is currently under review.</p>
  //       <Button onClick={() => window.location.reload()} className="mt-4">
  //         Refresh Status
  //       </Button>
  //     </div>
  //       ) : currentStep === 1 && isApproved ? (
  //         // Case 2: Show Payment Form
  //         <PaymentForm />
  //       ) : currentStep === 2 && isApproved ? (
  //         // Case 3: Show Certificate
  //         <BuildingPermit />
  //       ) : (
  //         // Case 1: Waiting for Approval
  //         <div className="flex flex-col items-center justify-center h-screen">
  //           <h2 className="text-xl font-semibold">Waiting for Approval</h2>
  //           <p className="text-gray-500">Your application is currently under review.</p>
  //           <Button onClick={() => window.location.reload()} className="mt-4">
  //             Refresh Status
  //           </Button>
  //         </div>
  //     )}
  //   </div>
  // );



}

export default StepperForm;

