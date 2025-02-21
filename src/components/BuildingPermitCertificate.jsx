import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


const BuildingPermitCertificate = () => {


    const dataItems = [
      { label: "የባለ ይዞታው ስም", value: " " },
      { label: "የካርታ ቁጥር", value: " " },
      { label: "የግብር ከፋይ መለያ ቁጥር", value: " " }
    ];
    const lastItems = [
      { label: "የቀድሞ ግንባታ ፈ. ቁጥር", value: " " },
      { label: "የፈቃድ አገልግሎት ጊዜ", value: " " },
      { label: "የግብር ከፋይ መለያ ቁጥር", value: " " },
      { label: "ቀን", value: "" }
    ];

    const checkboxItems = [
      { id: "terms1", label: "የህዝብ መጠቀሚያ ላልሆኑ" },
      { id: "terms2", label: "የህዝብ መጠቀሚያ ለሆኑ" },
      { id: "terms3", label: "የግንባታ ፈቃድ ቁጥር" },
      
    ];
    const abariItems = [
      { id: "terms1", label: "በቀረበው የግንባታ ፍቃድ ሰነድ መሰረት ግንባታቅው መካሄድ ይችላል" },
      { id: "terms2", label: "ፈቃዱን የማያስከለክሉና በግንባታ ወቅት መታረም ያለባቸውን ከዚህ በታች የተጠቀሱት ግድፈቶች ናቸው" },
      { id: "terms3", label: "ከዚህ በታች የተጠቀሱት ግድፈቶች የግንባታ ፈቃዱን የሚያስከለክሉ ናቸው" },
      { id: "terms4", label: "የህዝብ መጠቀሚያ ላልሆኑ" },
    ];

    const senedochItems = [
      { id: "terms1", label: "የህዝብ መጠቀሚያ ላልሆኑ" },
      { id: "terms2", label: "የህዝብ መጠቀሚያ ለሆኑ" },
      { id: "terms3", label: "ለመሰረተ ልማት ዝርጋታዎች" },
      { id: "terms4", label: "የህዝብ መጠቀሚያ ለሆኑ" },
      { id: "terms5", label: "ለመሰረተ ልማት ዝርጋታዎች" },
      { id: "terms6", label: "የህዝብ መጠቀሚያ ለሆኑ" },
      { id: "terms7", label: "ለመሰረተ ልማት ዝርጋታዎች" }
    ];

  return (
        <div className="certificate border p-4 max-w-3xl mx-auto bg-white text-black shadow-md">
          <div className="header text-center mb-4">
          <div className='flex justify-center py-2'>
          {/* <Avatar>
      <AvatarImage src="../AACA.jpeg" width={100} height={200} alt="@shadcn" />
      <AvatarFallback>AA</AvatarFallback>
    </Avatar> */}
    <img src='../AACA.jpeg' width={100} height={100} />
          </div>
            <h3 className="text-lg">አዲስ አበባ ከተማ አስተዳደር</h3>
            <h2 className="font-bold text-xl">የግንባታ ፈቃድ የምስክር ወረቀት</h2>
          </div>
    

          <div className="flex space-x-4 p-2 justify-center">
        {checkboxItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox id={item.id} disabled />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
          
        ))}
      </div>


      <div className="flex justify-center gap-4">
      <Card className="w-3/4 h-12 flex items-center justify-center p-4 shadow-lg">
        <p>በቦሌ ክ/ከተማ የቦታና የግንባታ ፍቃድ አሰጣጥና የይዞታ አስተዳደር አብይ የስራ ሂደት<br /><span className='pl-40'>ህንፃ   ፎቅ   ቢሮ  ፖ. ሳ. ቁ.</span></p>
      </Card>
      <Card className="w-1/4 h-12 flex items-center justify-center p-4 shadow-lg">
        <p>የግንባታ ፈቃድ ክፍል<br /><span>ቢሮ ቁጥር</span></p>
      </Card>
    </div>


    
           <div className="flex space-x-4 p-2">
      {dataItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">{item.label}</span>
          <Card className="w-24 h-8 flex items-center justify-center text-md font-semibold shadow-md">
            <CardContent className="flex items-center justify-center h-full">{item.value}</CardContent>
          </Card>
        </div>
      ))}
    </div>

    

    <div className="py-2">
                      <p>የግንባታ ፈቃድ ውሳኔ  </p>
                      <p>ሲሳ ሲሳ አዋጅ በመሠረት በሥራ ሀላፊነት የተሰጠ የሥራ ማረጋገጫ ነው።</p>
                    </div>


                    <div className="flex space-x-4 p-2 justify-center">
        {abariItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            
            <Label htmlFor={item.id}>{item.label}</Label>
            <Checkbox id={item.id} disabled />
          </div>
          
        ))}
      </div>


      <div className='w-full'>
        <span>___________________________________________________________________________________________________</span><br/>
        <span>___________________________________________________________________________________________________</span>
      </div>
                    

<div className=' w-full py-2'>

<table class=" w-full table-auto border-collapse border border-gray-300">
  <tr>
    <td class="border border-gray-300 p-2 text-xl" rowspan="2">
      <p>
      ከዚህ በላይ ነዝርዝር ለተገለፀው ግንባታ የቀረበው <br />ሰነድ ተመርምሮ ግንባታው እንዲካሄድ 
      </p>
    </td>
    <td class="border border-gray-300 p-2 text-4xl" rowspan="2">ለክትትል</td>
  </tr>
  
</table>
</div>


<p>የግንባታ ፈቃድ ውሳኔ  </p>
<div className="flex space-x-4 p-2 justify-center">
        {senedochItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            
            <Label htmlFor={item.id}>{item.label}</Label>
            <Checkbox id={item.id} disabled />
          </div>
          
        ))}
      </div>


      <div className="flex space-x-4 p-2">
      {lastItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">{item.label}</span>
          <Card className="w-24 h-8 flex items-center justify-center text-md font-semibold shadow-md">
            <CardContent className="flex items-center justify-center h-full">{item.value}</CardContent>
          </Card>
        </div>
      ))}
    </div>


    <div className="grid grid-cols-2 gap-4 text-sm py-2">
                        <div>
                          <p className='text-left pl-10'>የአርክቴክቸራል መርማሪ ባለሙያ</p>
                          <p><strong>ስም:</strong> </p>
                          <p><strong>ፊርማ:</strong> </p>
                          <p><strong>ቀን:</strong> </p>
                          {/* <p><strong>የትውልድ ቀን:</strong> __/__/____</p>
                          <p><strong>ጾታ:</strong> ወንድ/ሴት</p>
                          <p><strong>የስራ አይነት:</strong> ሞዴል ስርዓት</p> */}
                        </div>
                      <div>
                        <p className='text-left pl-10'>የስትራክቸራል መርማሪ ባለሙያ</p>
                        <p><strong>ስም:</strong> </p>
                        <p><strong>ፊርማ:</strong> </p>
                        <p><strong>ቀን:</strong> </p>
                        {/* <p><strong>ስልክ ቁጥር:</strong> +251-#########</p>
                        <p><strong>ኢሜይል:</strong> example@example.com</p> */}
                      </div>

          {/* QR Code Section */}
          <div className="flex justify-end items-start col-span-2">
              <div className="w-32 h-10 flex justify-center items-center">
                {/* Replace with your actual QR code */}
                <img src='../qrCode.png' width={100} height={100} alt="QR Code" />
              </div>
            </div>


            </div>

            


            <div>
            <p>ማሳሰቢያ 1.. ክክችብድስጅችክድስ ቭችጅክወኡኢፍህወፍባስድ   </p>
            <p>ሲሳ ሲሳ አዋጅ በመሠረት በሥራ ሀላፊነት የተሰጠ የሥራ ማረጋገጫ ነው።</p>
            </div>




          </div>
      


          
        
      );
}

export default BuildingPermitCertificate