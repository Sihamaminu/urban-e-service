

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 1: Personal Information
    </h3>
            <Input placeholder="Plot Number" />
            <Input placeholder="City" />
            <Input placeholder="Sub City" />
            <Input placeholder="Wereda/ Kebele" />
            <Input placeholder="House Number" />
            
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Step 2: Contact Details
    </h3>
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
            Step 3: Account Details
    </h3>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </div>
        );
      case 4:
        return (
          <div className="text-center p-4">
            <p className="text-lg font-medium">Review and Submit</p>
            <p className="text-muted-foreground text-sm mt-2">
              Confirm all information is correct before submitting.
            </p>
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
          Construction Permit Application
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