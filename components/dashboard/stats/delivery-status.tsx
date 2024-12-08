import { Badge } from "@/components/general/UI/badge";
import React from "react";

const DeliveryStatus: React.FC = () => {
  let status: boolean;

  Math.random() < 0.5 ? (status = true) : (status = false);

  return (
    <Badge
      variant={`${status ? "success" : "danger"}`}
      className="flex w-28 justify-center"
    >
      {status ? "Delivered" : "Failed"}
    </Badge>
  );
};
export default DeliveryStatus;
