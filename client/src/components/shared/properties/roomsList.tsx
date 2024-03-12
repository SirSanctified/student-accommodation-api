import type { RoomsListProps } from "@/types";
import RoomCard from "./roomCard";

const RoomsList = ({ rooms }: { rooms: RoomsListProps[] }) => {
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4  md:flex-row">
      {rooms.map((room, index) => (
        <RoomCard key={index} {...room} />
      ))}
    </div>
  );
};

export default RoomsList;
