interface OrderHeadProps {
  id: string;
  orderDate: string;
  status: string;
}

const OrderHead: React.FC<OrderHeadProps> = ({ id, orderDate, status }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center border-b-[2px] border-amber-500 ">
    <div className=" flex col-span-2 flex-row gap-2 py-2">
      <span>order id:</span>
      <span>{id}</span>
    </div>
    <div className=" flex flex-row gap-2">
      <span>order Date:</span>
      <span>{orderDate}</span>
    </div>
    <div className=" flex flex-row gap-2">
      <span>Status:</span>
      <span>{status}</span>
    </div>
  </div>
  );
};

export default OrderHead;
