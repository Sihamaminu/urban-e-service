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

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  // Fetch applications from the API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:4023/api/application");
        if (response.data.status === "success") {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

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
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
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
                    <strong>Service ID:</strong> {selectedApp.serviceId}
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
      </Dialog>
    </div>
  );
};

export default MyApplications;