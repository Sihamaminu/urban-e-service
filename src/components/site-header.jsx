import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const navigate = useNavigate()
  const pathname = window.location.pathname
  const isAuthPage = pathname === "/login" || pathname === "/register"


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-20 items-center justify-between p-10 w-full ">
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold"
          >
             <img src="./yegna.jpeg" width={75} height={75} style={{border: 0}} />
          </motion.span>
        </Link>
        
        {/* {!isAuthPage && ( */}
          <div className="flex items-center space-x-4">
            {/* <NavigationMenu className="hidden md:flex text-right">
          <NavigationMenuList>
          <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="#pricing" className="h-10 px-4 py-2">Features</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="#pricing" className="h-10 px-4 py-2">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="#pricing" className="h-10 px-4 py-2">Pricing</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
         <div className="flex space-x-4">
      <ScrollButton label="About Us" path="/" sectionId="aboutus" />
      <ScrollButton label="Services" path="/" sectionId="services" />
      <ScrollButton label="Contact Us" path="/" sectionId="contactus" />
    </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            {/* <Button size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button> */}
            <Button size="sm" asChild>
            <ModeToggle />
            </Button>
          </div>
        {/* )} */}
      </div>
    </motion.header>
  )
}

function ScrollButton({ label, path, sectionId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${path}#${sectionId}`);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      {label}
    </Button>
  );
}

export default ScrollButton;