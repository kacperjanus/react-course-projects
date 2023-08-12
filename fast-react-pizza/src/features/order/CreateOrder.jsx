import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str,
    );

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);
    const cart = useSelector(getCart);
    const navigation = useNavigation();
    const formErrors = useActionData();
    const {
        username,
        address,
        position,
        status: addressStatus,
        error: errorAddress,
    } = useSelector((state) => state.user);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? Number(totalCartPrice) * 0.2 : 0;
    const dispatch = useDispatch();

    const isLoading = addressStatus === "loading";

    if (!cart.length) return <EmptyCart />;

    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            name="address"
                            required
                            defaultValue={address}
                        />
                        {addressStatus === "error" && (
                            <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    <span className="absolute right-[5px] top-[5px] z-50">
                        {!position.longitude && !position.latitude && (
                            <Button
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(fetchAddress());
                                }}
                                disabled={isLoading}
                            >
                                Get position
                            </Button>
                        )}
                    </span>
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label className="font-medium" htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.longitude && position.latitude
                                ? `${position.latitude}, ${position.longitude}`
                                : ""
                        }
                    />
                    <Button type="primary" disabled={isSubmitting || isLoading}>
                        Order now{" "}
                        {formatCurrency(Number(totalCartPrice) + priorityPrice)}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    };

    const errors = {};

    if (!isValidPhone(order.phone))
        errors.phone = "Incorrect phone number. We may need it to contact you";
    if (Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
