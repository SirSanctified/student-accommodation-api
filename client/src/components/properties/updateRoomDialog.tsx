import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Room } from "@/types";
import RoomForm from "../shared/properties/roomForm";

interface UpdateRoomDialogProps {
  trigger: React.ReactNode;
  roomData: Room;
  property: string;
}

const UpdateRoomDialog: React.FC<UpdateRoomDialogProps> = ({
  trigger,
  roomData,
  property,
}) => {
  const propertyName = property.split("/").at(-1) ?? "";
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <RoomForm
          action="Update"
          roomData={roomData}
          property={propertyName}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomDialog;
