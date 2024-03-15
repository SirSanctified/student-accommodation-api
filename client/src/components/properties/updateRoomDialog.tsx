import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Room } from "@/types";
import RoomForm from "../shared/properties/roomForm";

const UpdateRoomDialog = ({
  trigger,
  roomData,
  property,
}: {
  trigger: React.ReactNode;
  roomData: Room;
  property: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <RoomForm
          action="Update"
          roomData={roomData}
          property={property.split("/").at(-1) ?? ""}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomDialog;
