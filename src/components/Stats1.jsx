import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Stats1 = () => (
  <div className="w-full p-10">
    <div className="container mx-auto">
    <div className="flex gap-4 flex-col p-5">
                        <div className=" w-full flex justify-center items-center ">
                        
                        <div className="flex gap-2 flex-col">
                        {/* <div className="text-center">
                          <Badge variant="outline">Platform</Badge>
                        </div> */}
                          <h3 className="text-3xl lg:text-5xl text-primary tracking-tighter max-w-xl text-center font-regular">
                          Our Commitment
                          </h3>
                          
                        </div>
                      </div>
                        </div>
      <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
            
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            10k+
            <span className="text-muted-foreground text-sm tracking-normal">
              
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Happy Clients
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
          {/* <MoveDownLeft className="w-4 h-4 mb-10 text-destructive" /> */}
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            100+
            <span className="text-muted-foreground text-sm tracking-normal">
              
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Expert Team Members
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
          {/* <MoveUpRight className="w-4 h-4 mb-10 text-success" /> */}
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            25+
            <span className="text-muted-foreground text-sm tracking-normal">
              
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
            Years Of Excellence
          </p>
        </div>
        <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
          {/* <MoveUpRight className="w-4 h-4 mb-10 text-primary" /> */}
          <MoveUpRight className="w-4 h-4 mb-10 text-primary" />
          <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
            24/7
            <span className="text-muted-foreground text-sm tracking-normal">
              
            </span>
          </h2>
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
        Customer Support
          </p>
        </div>
      </div>
    </div>
  </div>
);