import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function FileUploadForm({ applicationId }) {
    const [files, setFiles] = useState([null, null, null]);
    const { toast } = useToast();
    const API_URL = import.meta.env.VITE_API_URL;
  
    const handleFileChange = (index) => (event) => {
      const newFiles = [...files];
      newFiles[index] = event.target.files[0];
      setFiles(newFiles);
    };
  
    const uploadFiles = async () => {
      try {
        const token = getCookie('accessToken');
        const formData = new FormData();
  
        files.forEach((file, index) => {
          if (file) {
            formData.append(`file${index}`, file);
          }
        });
        formData.append('applicationId', applicationId);
  
        const response = await axios.post(
          `${API_URL}/application/upload-files`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        if (response.status === 200 || response.status === 201) {
          toast({ description: 'Files uploaded successfully!' });
          setFiles([null, null, null]);
        }
      } catch (error) {
        console.error('File upload error:', error);
        toast({
          description: error.response?.data?.message || 'Failed to upload files',
          variant: 'destructive',
        });
      }
    };
  
    return (
      <Card className="w-full max-w-md mt-4">
        <CardHeader>
          <CardTitle>Upload Supporting Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((num, index) => (
              <div key={num} className="flex flex-col gap-2">
                <Label htmlFor={`file-${num}`}>Document {num}</Label>
                <Input
                  id={`file-${num}`}
                  type="file"
                  onChange={handleFileChange(index)}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
              </div>
            ))}
            <Button
              onClick={uploadFiles}
              disabled={!files.some(file => file !== null)}
              className="w-full"
            >
              Upload Files
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

export default FileUploadForm;