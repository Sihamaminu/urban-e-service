
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"

// export default function PaymentForm() {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Card className="w-full max-w-xl">
//           <CardHeader>
//             <CardTitle>Payment</CardTitle>
//             <CardDescription>Enter your payment details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="card-number">Card Number</Label>
//                   <Input id="card-number" type="text" placeholder="0000 0000 0000 0000" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="expiration">Expiration Date</Label>
//                   <div className="flex gap-2">
//                     <Select>
//                       <SelectTrigger id="expiration-month">
//                         <SelectValue placeholder="MM" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
//                           <SelectItem key={month} value={month.toString().padStart(2, "0")}>
//                             {month}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <Select>
//                       <SelectTrigger id="expiration-year">
//                         <SelectValue placeholder="YYYY" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear()).map((year) => (
//                           <SelectItem key={year} value={year.toString()}>
//                             {year}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="cvv">CVV</Label>
//                   <Input id="cvv" type="text" placeholder="123" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="billing-address">Billing Address</Label>
//                   <Input id="billing-address" type="text" placeholder="123 Main St, Anytown USA" />
//                 </div>
//               </div>
//               <div className="grid gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="item-name">Item Name</Label>
//                   <Input id="item-name" type="text" placeholder="Item 1" />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="item-price">Item Price</Label>
//                   <Input id="item-price" type="number" placeholder="19.99" />
//                 </div>
//                 {/* <div className="space-y-2">
//                   <Label htmlFor="item-quantity">Quantity</Label>
//                   <Input id="item-quantity" type="number" placeholder="1" />
//                 </div> */}
//                 {/* <Button variant="outline">Add Item</Button> */}
//               </div>
//             </div>
//             {/* <div className="grid gap-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <div>Item 1</div>
//                 <div>$19.99</div>
//                 <div>2</div>
//                 <div className="justify-self-end">
//                   <Button variant="outline" size="icon">
//                     <TrashIcon className="h-4 w-4" />
//                     <span className="sr-only">Remove</span>
//                   </Button>
//                 </div>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <div>Item 2</div>
//                 <div>$29.99</div>
//                 <div>1</div>
//                 <div className="justify-self-end">
//                   <Button variant="outline" size="icon">
//                     <TrashIcon className="h-4 w-4" />
//                     <span className="sr-only">Remove</span>
//                   </Button>
//                 </div>
//               </div>
//             </div> */}
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <div className="space-y-1">
//               <div className="text-muted-foreground">Total</div>
//               <div className="text-2xl font-bold">$99.99</div>
//             </div>
//             <Button type="submit">Pay Now</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }
  

// function TrashIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   )
// }

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Enter your payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input type="hidden" id="userId" value="USER_ID_HERE" />
          <input type="hidden" id="applicationId" value="APPLICATION_ID_HERE" />

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="99.99 ETB" required disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select>
                <SelectTrigger id="currency" disabled>
                  <SelectValue placeholder="ETB"   />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="ETB">ETB</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" type="text" value="Pending" readOnly />
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="teleBirr">teleBirr</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "Credit Card" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" type="text" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" type="text" placeholder="123" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger id="expiration-month">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger id="expiration-year">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear()).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="transaction-id">Transaction ID (Optional)</Label>
              <Input id="transaction-id" type="text" placeholder="Enter transaction ID if available" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paid-at">Paid At</Label>
              <Input id="paid-at" type="text" value={new Date().toLocaleString()} readOnly />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="space-y-1">
            <div className="text-muted-foreground">Total</div>
            <div className="text-2xl font-bold">99.99 ETB</div>
          </div>
          <Button type="submit">Pay Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
