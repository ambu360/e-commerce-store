import { format } from "date-fns";

interface OrderHeadProps {
  id: string;
  orderDate: string;
  status: string;
}

const OrderHead: React.FC<OrderHeadProps> = ({ id, orderDate, status }) => {
  const date = new Date(orderDate);
  const formattedDate = format(date, "yyyy-MM-dd");
  return (
    <div className="
    grid 
    grid-rows-3
    lg:grid-cols-3
    lg:grid-rows-none
    gap-1
    md:gap-4 
    items-center 
    border-b-[2px] 
    py-2 
    border-amber-500 ">
      <div className=" flex  flex-row gap-2 py-2 items-center justify-start lg:justify-center">
        <span>order id:</span>
        <span className="font-medium text-lg text-neutral-800 ">{id}</span>
      </div>
      <div className=" flex flex-row gap-2 items-center justify-start lg:justify-center">
        <span>Order Date:</span>
        <span className="font-medium text-lg text-neutral-800 ">
          {formattedDate}
        </span>
      </div>
      <div className=" flex flex-row gap-2 justify-start lg:justify-center items-center">
        <span>Status:</span>
        <span className="font-medium text-lg text-neutral-800 ">{status}</span>
      </div>
    </div>
  );
};

export default OrderHead;
