"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Storage } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  value: z.string().min(2),
});

type StorageFormValues = z.infer<typeof formSchema>

interface StorageFormProps {
  initialData: Storage | null;
};

export const StorageForm: React.FC<StorageFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit storage' : 'Create storage';
  const description = initialData ? 'Edit a storage.' : 'Add a new storage';
  const toastMessage = initialData ? 'Storage updated.' : 'Storage created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<StorageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: ''
    }
  });

  const onSubmit = async (data: StorageFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/storages/${params.storageId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/storages`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/storages`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/storages/${params.storageId}`);
      router.refresh();
      router.push(`/${params.storeId}/storages`);
      toast.success('Storage deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all product variants using this storage first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
    <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid gap-4 lg:max-w-lg">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valie</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Storage value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};