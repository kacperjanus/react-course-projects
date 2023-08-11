import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
    decreaseItemQuantity,
    deleteItem,
    getPizzaById,
    increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
    const dispatch = useDispatch();

    const quantity = useSelector(getPizzaById(pizzaId)).quantity;

    function handleIncreaseQuantity() {
        dispatch(increaseItemQuantity(pizzaId));
    }

    function handleDecreaseQuantity() {
        dispatch(decreaseItemQuantity(pizzaId));
    }

    return (
        <div className="space-x-2">
            <Button type="round" onClick={handleIncreaseQuantity}>
                +
            </Button>
            <span>{quantity}</span>
            <Button type="round" onClick={handleDecreaseQuantity}>
                -
            </Button>
        </div>
    );
}

export default UpdateItemQuantity;
