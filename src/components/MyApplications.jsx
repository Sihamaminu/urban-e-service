import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import axios from "axios";
import { Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { useToast } from "@/hooks/use-toast"; 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const API_URL = import.meta.env.VITE_API_URL;

const BANK_OPTIONS = [
  "teleBirr",
  "Credit Card",
  "CBE Birr",
  "Amole",
  "Chapa",
  "Bank Transfer",
  "PayPal",
  "Mobile Money"
];

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  const [selectedBank, setSelectedBank] = useState("");

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [applicationCode, setApplicationCode] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [transactionId, setTransactionId] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { toast } = useToast();


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Cookie not found
  };

 

  // Fetch applications from the API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchApplications = async () => {
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }
      try {
        // const response = await axios.get("http://localhost:4023/api/application");
        const response = await axios.get(`${API_URL}/application/user/${userId}`);
        if (response.data.status === "success") {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  // Fetch payment details by application code
  const fetchPaymentDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/application/code/${applicationCode}`);
      if (response.data.status === "success") {
        setPaymentDetails({
          application: response.data.application,
          payment: response.data.payment
        });
      } else {
        setPaymentDetails(null);
        alert(response.data.message || "Application not found");
      }
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
      setPaymentDetails(null);
      alert("Error fetching payment details");
    }
    setLoading(false);
  };

  const token = getCookie('accessToken');
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const updatePaymentStatus = async () => {
    console.log(token)
    setPaymentLoading(true);
    try {
      // const response = await axios.post(`${API_URL}/application/code/${applicationCode}/payment`, {
      //   paymentStatus: "Paid",
      //   transactionId: transactionId
      // });
      const response = await axios.post(
        `${API_URL}/application/code/${applicationCode}/payment`,
        {
          paymentStatus: "Paid",
          transactionId: transactionId,
        },
        axiosConfig
      );
      
      if (response.data.status === "success") {
        setPaymentDetails({
          application: response.data.application,
          payment: response.data.payment
        });
        toast({
          title: "Payment Successful",
          description: "Payment status has been updated successfully",
          variant: "success"
        });
        setTransactionId(""); // Reset transaction ID input
      }
    } catch (error) {
      console.error("Failed to update payment status:", error);
      toast({
        title: "Payment Failed",
        description: error.response?.data?.message || "Error updating payment status",
        variant: "destructive"
      });
    }
    setPaymentLoading(false);
  };

  // Define table columns for applications
  const applicationColumns = useMemo(
    () => [
      {
        accessorKey: "serviceId",
        header: "Service ID",
      },
      {
        accessorFn: (row) => row.subServiceId?.name || "N/A",
        id: "subService",
        header: "Sub-service",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "currentStep",
        header: "Current Step",
      },
      {
        id: "paymentForm",
        header: "Payment Form",
        cell: ({ row }) => (
          <Button 
            size="sm" 
            onClick={() => {
              setApplicationCode(row.original.applicationCode || "");
              setIsPaymentDialogOpen(true);
            }}
          >
            View Payment
          </Button>
        ),
      },
      {
        id: "details",
        header: "Details",
        cell: ({ row }) => (
          <Button size="sm" onClick={() => setSelectedApp(row.original)}>
            {/* View Details */}
            <Eye />
          </Button>
        ),
      },
    ],
    []
  );

  

  // Define table columns for workflow steps
  const workflowColumns = useMemo(
    () => [
      {
        accessorKey: "stepName",
        header: "Step Name",
      },
      {
        accessorKey: "officerId",
        header: "Officer ID",
        cell: ({ getValue }) => getValue() || "N/A",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "comments",
        header: "Comments",
        cell: ({ getValue }) => getValue() || "No comments",
      },
    ],
    []
  );

  // Set up the table instance for applications
  const applicationsTable = useReactTable({
    data: applications,
    columns: applicationColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Default page size
      },
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

      <Card>
        <CardContent className="p-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              {applicationsTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {applicationsTable.getRowModel().rows.length > 0 ? (
                applicationsTable.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={applicationColumns.length} className="text-center py-4 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <Button
                onClick={() => applicationsTable.setPageIndex(0)}
                disabled={!applicationsTable.getCanPreviousPage()}
                className="mx-1"
              >
                {"<<"}
              </Button>
              <Button
                onClick={() => applicationsTable.previousPage()}
                disabled={!applicationsTable.getCanPreviousPage()}
                className="mx-1"
              >
                Previous
              </Button>
              <Button
                onClick={() => applicationsTable.nextPage()}
                disabled={!applicationsTable.getCanNextPage()}
                className="mx-1"
              >
                Next
              </Button>
              <Button
                onClick={() => applicationsTable.setPageIndex(applicationsTable.getPageCount() - 1)}
                disabled={!applicationsTable.getCanNextPage()}
                
              >
                {">>"}
              </Button>
            </div>
            <div>
              <span className="mr-2">
                Page{" "}
                <strong>
                  {applicationsTable.getState().pagination.pageIndex + 1} of{" "}
                  {applicationsTable.getPageCount()}
                </strong>
              </span>
              <select
                value={applicationsTable.getState().pagination.pageSize}
                onChange={(e) => applicationsTable.setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded p-1"
              >
                {[5, 10, 20].map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Application Details */}
      {/* <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected application.
            </DialogDescription>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <p>
                    <strong>Application ID:</strong> {selectedApp._id}
                  </p>
                  <p>
                    <strong>Service ID:</strong> {selectedApp.serviceId?.name}
                  </p>
                  <p>
                    <strong>Sub-service:</strong> {selectedApp.subServiceId?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedApp.status}
                  </p>
                  <p>
                    <strong>Current Step:</strong> {selectedApp.currentStep}
                  </p>
                  <p>
                    <strong>Details:</strong> {selectedApp.applicationDetails || "No details available."}
                  </p>
                </CardContent>
              </Card>

              <h4 className="text-lg font-semibold">Workflow Steps</h4>
              <Card>
                <CardContent className="p-4">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      {workflowColumns.map((column, index) => (
                        <th
                          key={index}
                          className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"
                        >
                          {column.header}
                        </th>
                      ))}
                    </thead>
                    <tbody>
                      {selectedApp.workflowSteps?.length > 0 ? (
                        selectedApp.workflowSteps.map((step, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            {workflowColumns.map((column, idx) => (
                              <td
                                key={idx}
                                className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                              >
                                {step[column.accessorKey]}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={workflowColumns.length} className="text-center py-4 text-gray-500">
                            No workflow steps available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog> */}

{selectedApp && (
  <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
        <DialogDescription>
          Detailed information about the selected application.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* General Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Application ID:</strong>
          </div>
          <div>{selectedApp._id}</div>

          <div>
            <strong>Service ID:</strong>
          </div>
          <div>{selectedApp.serviceId?.name || "N/A"}</div>

          <div>
            <strong>Sub-service:</strong>
          </div>
          <div>{selectedApp.subServiceId?.name || "N/A"}</div>

          <div>
            <strong>Status:</strong>
          </div>
          <div>{selectedApp.status}</div>

          <div>
            <strong>Current Step:</strong>
          </div>
          <div>{selectedApp.currentStep}</div>
        </div>

        {/* Application Details Table */}
        <div>
          <strong>Details:</strong>
          <div className="mt-2 max-h-60 overflow-y-auto border rounded-md">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left bg-gray-100">Key</th>
                  <th className="border p-2 text-left bg-gray-100">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedApp.applicationDetails || {}).map(
                  ([key, value]) => (
                    <tr key={key}>
                      <td className="border p-1">{key}</td>
                      <td className="border p-1">{value || "N/A"}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)}


{/* Payment Details Dialog */}
<Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Enter application code to view payment details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter Application Code"
                value={applicationCode}
                onChange={(e) => setApplicationCode(e.target.value)}
                className="mb-2"
              />
              <Button 
                onClick={fetchPaymentDetails}
                disabled={loading || !applicationCode}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>

            {paymentDetails && (
              <div className="space-y-2">
                <h4 className="font-semibold">Application Details:</h4>
                <p><strong>Application ID:</strong> {paymentDetails.application._id}</p>
                <p><strong>Service:</strong> {paymentDetails.application.serviceId?.name || "N/A"}</p>
                
                {paymentDetails.payment ? (
                  <>
                    <h4 className="font-semibold mt-2">Payment Details:</h4>
                    <p><strong>Payment ID:</strong> {paymentDetails.payment._id}</p>
                    <p><strong>Amount:</strong> {paymentDetails.payment.amount}</p>
                    <p><strong>Status:</strong> {paymentDetails.payment.status}</p>
                    <p><strong>Date:</strong> {new Date(paymentDetails.payment.createdAt).toLocaleString()}</p>


{/* Conditional UI based on payment status */}
{paymentDetails.payment.status === "Pending" && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-semibold">Complete Payment</h4>
                        <div className="py-4">
                        <Select
                          value={selectedBank}
                          onValueChange={setSelectedBank}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {BANK_OPTIONS.map((bank) => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        </div>
                        <Input
                          placeholder="Enter Transaction ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                        
                        <Button
                          onClick={updatePaymentStatus}
                          disabled={paymentLoading || !transactionId}
                        >
                          {paymentLoading ? "Processing..." : "Pay Now"}
                        </Button>
                      </div>
                    )}

                    {paymentDetails.payment.status === "Completed" && (
                      <Badge className="mt-2 bg-primary" variant="green-600">
                        Payment Completed
                      </Badge>
                    )}



                  </>
                ) : (
                  <p>No payment details available for this application.</p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Application Details Dialog */}
      {selectedApp && (
        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          {/* ... existing application details dialog code ... */}
        </Dialog>
      )}

    </div>
  );
};

export default MyApplications;