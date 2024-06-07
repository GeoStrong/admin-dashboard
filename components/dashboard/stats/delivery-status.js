import { Badge } from "@/components/general/UI/badge";

const DeliveryStatus = () => {
  let status;

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
