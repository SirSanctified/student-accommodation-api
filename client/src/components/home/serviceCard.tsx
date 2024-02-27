import Image from "next/image";

export type ServiceCardProps = {
  name: string;
  description: string;
  imageSrc: string;
};

const ServiceCard = ({ name, description, imageSrc }: ServiceCardProps) => {
  return (
    <div className="flex w-full flex-col">
      <Image
        src={imageSrc}
        alt={name}
        width={500}
        height={500}
        className="w-full rounded-lg object-cover"
      />

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="mt-2 text-start text-white/60">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
