import { StatusIcon } from "@/constants/constants";
import clsx from "clsx";
import Image from "next/image";


declare type Status = "completed" | "pending" | "failed";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("flex w-[120px] items-center justify-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600": status === "completed",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "failed",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="icons"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-[12px] leading-[16px] font-semibold capitalize", {
          "text-green-500": status === "completed",
          "text-blue-500": status === "pending",
          "text-red-500": status === "failed",
        })}
      >
        {status}
      </p>
    </div>
  );
};
