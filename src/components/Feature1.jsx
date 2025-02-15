import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export const Feature1 = () => (
  <div className="w-full py-10 lg:py-10">
    <div className="container mx-auto">
      <div className="grid border rounded-lg container py-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col p-5">
            <div>
              <Badge variant="outline">Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl lg:text-5xl text-primary tracking-tighter max-w-xl text-left font-regular">
                Something new!
              </h2>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                Managing a small business today is already tough.
              </p>
            </div>
          </div>
          <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-3 items-start lg:grid-cols-1 gap-6">
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Building Permit</p>
                <p className="text-muted-foreground text-sm">
                Apply for a permit to construct or renovate buildings within urban areas, ensuring compliance with safety and zoning laws.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Demolition Permit</p>
                <p className="text-muted-foreground text-sm">
                Get the necessary approval to demolish a building or structure in urban spaces, adhering to safety and environmental guidelines.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Night Building Permit</p>
                <p className="text-muted-foreground text-sm">
                Request a special permit to carry out construction or renovation work during night hours, complying with local regulations.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Lost Certificate Permit</p>
                <p className="text-muted-foreground text-sm">
                Apply for a replacement certificate for any lost or misplaced building-related documents or permits.
                </p>
              </div>
            </div>
            {/* <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Billboard Installation Permit</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it beautiful and modern.
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="bg-muted rounded-md aspect-square w-full " style={{ height: 450}}>


    <DotLottieReact
      src="https://lottie.host/981c3502-16fe-4a74-94d9-cebb8183b7a7/hn4d2isclc.lottie"
      loop
      autoplay
    />


        </div>
      </div>
    </div>
  </div>
);