import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const LandingPage = () => {
  const text = "How does this Website Work?".split(" ");
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const logos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      alt: "React",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
      alt: "NPM",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png",
      alt: "Redux",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
      alt: "Webpack",
    },
  ];

  return (
    <div>
      {/* Top Section */}
      <div>
  {/* Top Section */}
  <div className="flex justify-center bg-gray-200 h-[75vh]">
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-4xl h-full flex items-center"  
    >
      <CarouselContent className="flex items-center">
        {/* First Card */}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-4">
            <Card className="w-full h-80"> {/* Increased card height */}
              <CardContent className="flex items-center justify-center p-2 h-full">
                <img 
                  src="https://via.placeholder.com/400x300?text=Image+1"
                  alt="Placeholder 1"
                  className="object-cover w-full h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        {/* Second Card */}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-4">
            <Card className="w-full h-80">
              <CardContent className="flex items-center justify-center p-2 h-full">
                <img 
                  src="https://via.placeholder.com/400x300?text=Image+2"
                  alt="Placeholder 2"
                  className="object-cover w-full h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        {/* Third Card */}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-4">
            <Card className="w-full h-80">
              <CardContent className="flex items-center justify-center p-2 h-full">
                <img 
                  src="https://via.placeholder.com/400x300?text=Image+3"
                  alt="Placeholder 3"
                  className="object-cover w-full h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        {/* Fourth Card */}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-4">
            <Card className="w-full h-80">
              <CardContent className="flex items-center justify-center p-2 h-full">
                <img 
                  src="https://via.placeholder.com/400x300?text=Image+4"
                  alt="Placeholder 4"
                  className="object-cover w-full h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        {/* Fifth Card */}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-4">
            <Card className="w-full h-80">
              <CardContent className="flex items-center justify-center p-2 h-full">
                <img 
                  src="https://via.placeholder.com/400x300?text=Image+5"
                  alt="Placeholder 5"
                  className="object-cover w-full h-full rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      
      <CarouselPrevious className="self-center" />
      <CarouselNext className="self-center" />
    </Carousel>
  </div>
</div>


      {/* Text Animation */}
      <div className="my-32 flex justify-center">
        <div className="flex-col text-center">
          {text.map((el, i) => (
            <motion.span
              key={i}
              className="text-blue-700 text-3xl font-bold m-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: i / 10 }}
            >
              {el}{" "}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
        >
          <img
            src="/stages.svg"
            alt="Stages"
            className="w-full max-w-4xl"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="px-10 py-20 flex flex-col items-center">
        <motion.div
          className="w-full text-center"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-blue-700 text-3xl font-bold mb-6">
            Discover Our e-Service Platform
          </h2>
          <hr className="border-gray-300 mb-6" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At Ethiopian Civil Aviation Authority, we simplify the process of
            obtaining civil aviation certificates and licenses. Whether you're a
            pilot, aircraft operator, or aviation professional, our secure and
            user-friendly platform offers a seamless way to manage your licensing
            and certification needs.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-10 space-y-8">
          {[
            {
              title: "Convenience",
              description:
                "Manage applications, renewals, and licenses online with ease—available to you at any time.",
            },
            {
              title: "Efficiency",
              description:
                "The process is designed to ensure timely approvals and real-time updates, keeping you informed every step of the way.",
            },
            {
              title: "Security",
              description:
                "Your data is protected through advanced encryption, guaranteeing the confidentiality and integrity of your information.",
            },
            {
              title: "Compliance",
              description:
                "Our platform operates in full compliance with national and international civil aviation regulations, ensuring that all certificates and licenses meet the required standards.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-left max-w-3xl mx-auto"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 * index, duration: 0.7 }}
            >
              <h3 className="text-xl font-bold text-blue-700">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logos Section */}
      <div className="text-center py-20 bg-gray-100">
        <motion.h2
          className="text-blue-700 text-3xl font-bold mb-10"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Partners
        </motion.h2>
        <motion.div
          className="flex justify-center gap-10 items-center flex-wrap"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 20 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
                duration: 0.5,
              },
            },
          }}
        >
          {logos.map((logo, index) => (
            <motion.img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-16 grayscale hover:grayscale-0 transition duration-300"
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;



// DEFAULT

// export default function LandingPage() {
//     return (
//       <div className="p-6 text-center">
//         <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
//         <p className="mt-2 text-gray-600">Select an option from the sidebar to get started.</p>
//       </div>
//     );
//   }
  



