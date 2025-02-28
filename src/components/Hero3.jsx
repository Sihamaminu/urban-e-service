import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';



export function Hero3  () { 

    const { t } = useTranslation();
  
  return (

  

  <div className="w-full pl-10 pr-10 h-screen flex items-center justify-center">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">{t('yegnaPropertyManagement')}</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            
            <h3 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-primary text-left font-regular">
            {t('eService')}
            </h3>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
            {t('eServiceDescription')}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4 bg-primary text-secondary" variant="outline">
            {t('getServices')} <MoveRight className="w-4 h-4" />
            </Button>
            {/* <Button size="lg" className="gap-4">
              Sign up here <PhoneCall className="w-4 h-4" />
            </Button> */}
          </div>
        </div>
        <div className="bg-muted rounded-md aspect-square w-full mb-10" style={{ height: 300}}>
            <img src="./mui_main.png" />
        </div>
      </div>
    </div>
  </div>
)};