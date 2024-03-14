"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import type { AxiosErrorWithDetails } from "@/types";

const DeleteConfirmition = ({
  trigger,
  actionUrl,
  item,
}: {
  trigger: React.ReactNode;
  actionUrl: string;
  item: string;
}) => {
  async function action() {
    try {
      await axios.delete(actionUrl, {
        withCredentials: true,
      });
      toast.success("Successfully deleted");
      window.location.reload();
    } catch (error) {
      alert(JSON.stringify(error));
      const message =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "Cannot delete, something went wrong";
      toast(`Failed to delete: ${message}`);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {item} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={action}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmition;
