import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const ImageFileInput = ({
  value,
  onFilesChange,
  isMulti = false,
  id,
  children,
}: {
  value?: File[];
  onFilesChange(files: File[]): void;
  isMulti?: boolean;
  id?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative w-full">
      {children}
      <Input
        type="file"
        name="images"
        accept="image/*"
        multiple={isMulti}
        id={id}
        onChange={(e) => {
          const fileList =
            e.target.files?.length && value
              ? [...e.target.files, ...value]
              : value ?? e.target.files;
          if (fileList) {
            const files = [...fileList];
            onFilesChange(files);
          }
        }}
        className="w-full bg-indigo-200 text-indigo-950 focus:outline-none"
      />
      {value && value.length > 0 && id !== "display_image" && (
        <X
          size={24}
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => {
            onFilesChange([]);
          }}
        />
      )}
    </div>
  );
};
export default ImageFileInput;
