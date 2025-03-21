import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import StepperForm from "@/components/StepperForm";
import { Outlet } from "react-router-dom";

import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('accessToken');

if (token) {
  debugger;
  const decoded = jwtDecode(token);
  console.log(decoded); // Display the token payload (e.g., { id, role, email, firstName })
}

export default function Page() {
  return (



    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 bg-gray-50 shadow-sm bg-primary">
          <SidebarTrigger className="-ml-1 text-foreground" />
          <Separator orientation="vertical" className="h-4 mx-2 bg-foreground" />
          <Breadcrumb className="flex-1"> {/* Makes Breadcrumb stretch */}
            <BreadcrumbList className="flex gap-2 text-foreground text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Yegna Property Management System</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage><span className="text-foreground">Ministry of Urban & Infrastructure e-Service</span></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"> Full width grid */}
            {/* <div className="aspect-video rounded-xl bg-muted/50 w-full" />
            <div className="aspect-video rounded-xl bg-muted/50 w-full" />
            <div className="aspect-video rounded-xl bg-muted/50 w-full" /> */}
          {/* </div> */}

          {/* <div className="flex-1 rounded-xl bg-muted/50 p-6 w-full"> Full width container */}
            
          {/* </div> */}
        {/* </div> */}

        {/* <StepperForm /> */}
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  );
}
