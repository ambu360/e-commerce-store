
import OrderItemWithProduct from '@/app/Orders/OrdersClient'
import { SafeProduct } from '@/app/types';
import { OrderItem } from '@prisma/client';
interface OrderInfoProps {
    item:OrderItem & { product: SafeProduct }
}
const OrderInfo:React.FC<OrderInfoProps> = ({item}) =>{

    return (
        <div>{item.product.name}</div>
    )
}


export default OrderInfo;