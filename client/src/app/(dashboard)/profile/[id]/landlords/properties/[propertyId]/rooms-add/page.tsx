import RoomForm from "@/components/shared/properties/roomForm";

const AddRoomPage = ({
  params,
}: {
  params: { id: string; propertyId: string };
}) => {
  return (
    <div>
      <RoomForm property={params.propertyId} action="Add" />
    </div>
  );
};

export default AddRoomPage;
