import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Footer } from "@/components/footer"
import { Zap, Command, Scale, Bot, Shield, Sparkles, Check } from "lucide-react"
import { Hero5 } from "@/components/Hero5"
import { Hero3 } from "@/components/Hero3"

import { Footer1 } from "@/components/Footer1"
import { Feature1 } from "@/components/Feature1"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AboutUs } from "@/components/AboutUs"
import { Stats1 } from "@/components/Stats1"
import { MoveRight, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';



export default function Landing() {

  const { hash } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);


  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1" id="home"> 
        {/* <section className="flex min-h-screen flex-col items-center justify-center space-y-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container flex flex-col items-center justify-center gap-6 text-center"
          >
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="#"
              className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
            >
              🎉 <Separator className="mx-2 h-4" orientation="vertical" /> Welcome to
            </motion.a>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1] text-primary"
            >
              Ministry of Urban and Infrastructure 
               <br />
               e-Service
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
            >
              The Electronic Service Designed by Yegna Property Management System For Urban and infrastructure was designed to provide digital public services to citizens, non-citizens, businesses, and both governmental and non-governmental organizations. It efficiently delivers electronic services and enhances the convenience of obtaining public services.
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Button size="lg" className="h-12 px-8">
                Start Building
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </section> */}

        {/* <Hero5 /> */}

        <Hero3 />
        {/* <section className="flex min-h-screen flex-col items-center justify-center space-y-10 py-24">
        <Hero3 />
        </section> */}

        <Separator className="my-1" />

        {/* <section className="container space-y-12 py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-primary">Features built for scale</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Quinx provides all the tools you need to create powerful Discord bots that can scale to millions of users.
            </p>
          </motion.div>
          <div className="mx-auto grid gap-8 sm:max-w-3xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  rotateX: index % 2 === 0 ? 5 : -5,
                  rotateY: index % 3 === 0 ? 5 : -5,
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section> */}


<div className="p-10">
<Feature1 />
</div>



        <Separator className="my-12" />

        {/* <section id="pricing" className="container py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-primary">Simple, transparent pricing</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the plan that's right for you and start building amazing Discord bots today.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col overflow-hidden rounded-lg border bg-background"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    ${plan.price}
                    <span className="ml-1 text-xl font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{plan.description}</p>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full">{plan.buttonText}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section> */}

        <section id="aboutus" className="lg:pt-28">
        <AboutUs />
        </section>


        <Separator />

<Stats1 />

<Separator />

  <div className="flex items-center justify-center">
  <section id="services" className="container  lg:py-20 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-primary">Our e-Services</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose the service that's right for you and start applying.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {eServices.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col overflow-hidden rounded-lg border bg-background"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {/* <div className="mt-4 flex items-baseline text-3xl font-bold">
                    ${plan.price}
                    <span className="ml-1 text-xl font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{plan.description}</p> */}
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Dialog>
  <DialogTrigger>
    <Button  className="mt-8 w-full bg-primary text-white hover:text-primary hover:bg-primary/90">{plan.buttonText}<MoveRight className="w-4 h-4" /></Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{plan.name}</DialogTitle>
      <DialogDescription>


      <Accordion type="multiple">
      {plan.features.map((feature, featureIndex) => (
        <AccordionItem key={featureIndex} value={`item-${featureIndex}`}>
    <AccordionTrigger>{feature}</AccordionTrigger>
    <AccordionContent>
      {feature}
      <Button className="mt-8 w-full bg-primary text-white hover:text-primary hover:bg-primary/90" onClick={() => navigate("/login")}>
        Apply
      </Button>
    </AccordionContent>
  </AccordionItem>
))}
  
</Accordion>


      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


                  {/* <Button className="mt-8 w-full">{plan.buttonText}<MoveRight className="w-4 h-4" /></Button> */}
                </div>
              </motion.div>
            ))}
          </div>
        </section> 
  </div>
        <Separator />

        <div className="flex items-center justify-center">
        <section className="container py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center"
          >
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl text-primary">Ready to get started?</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Apply to your Service
            </p>
            <Button size="lg" className="mt-4 w-full bg-primary text-white hover:text-primary hover:bg-primary/90" onClick={() => navigate("/login")}>
              Start Applying Now
            </Button>
          </motion.div>
        </section>
        </div>
      </main>
      {/* <Footer /> */}

<section id="contactus">
<Footer1 />
      
</section>
    </div>
  )
}

const features = [
  {
    name: "Easy Setup",
    description: "Get your bot up and running in minutes with our intuitive interface.",
    icon: Zap,
  },
  {
    name: "Powerful Commands",
    description: "Create complex commands with our visual command builder.",
    icon: Command,
  },
  {
    name: "Scale Infinitely",
    description: "Built to handle millions of users and messages.",
    icon: Scale,
  },
  {
    name: "AI-Powered",
    description: "Leverage artificial intelligence to create smarter responses.",
    icon: Bot,
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade security to protect your bot and users.",
    icon: Shield,
  },
  // {
  //   name: "Custom Features",
  //   description: "Build custom features without touching any code.",
  //   icon: Sparkles,
  // },
] 

const eServices = [
  {
    name: "Construction Permit",
    price: 0,
    description: "Perfect for small communities and hobbyists.",
    features: [
      "የአዱስ ወይም ማስፋፍያ ግንባታ ፍቃድ የመስጠት አገልግሎት", 
      // "አጥር ግንባታ ፍቃድ የመስጠት አገልግሎት ስታንዳርድ", 
      "ግንባታን የማፍረስ ፍቃድ", 
      "የምሽት ግንባታ ስራ ፍቃድ መስጠት",
      "ማስታወቂያ ሰሌጻ ተከላ ፍቃድ መስጠት",
      "ምትክ ማስረጃ የመስጠት አገልግሎት"
    ],
    buttonText: "Go to Construction Permit Services",
  },
  {
    name: "Land Development Management Sector",
    price: 8,
    description: "Ideal for growing communities and businesses.",
    features: [
      "የካሳ፣ ምትክ ቤት ወይም ምትክ ቦታ መቀበያ የተነሺነት ምስክር ወረቀት አሰጣጥ አገልግሎት",
      "የሊዝ ውል ማዋዋል አገልግሎት",
      "ከተማ መሬት የይዞታ ማረጋገጫ",
      "ሊዝ ውል አፈፃፀም ክትትል ሥራ",
      "የመሬት ይዞታ የመጠቀም መብት",
      "የድንበር ክርክር የመፍታት አገልግሎት",
    ],
    buttonText: "Go to Land Development Management Sector Services",
  },
] 

