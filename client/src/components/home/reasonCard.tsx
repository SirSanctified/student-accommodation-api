type ReasonCardProps = {
  reason: string;
  description: string;
  icon: JSX.Element;
};
const ReasonCard = ({ reason, description, icon }: ReasonCardProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 rounded-md p-4 text-indigo-950 shadow-lg transition-all duration-500 ease-linear hover:bg-indigo-200">
      {icon}
      <h3 className="text-2xl font-bold">{reason}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ReasonCard;
