import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
    const {
        isLoading,
        error,
        settings: {
            minBookingLength,
            maxBookingLength,
            maxGuestPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();

    const { isUpdating, updateSetting } = useUpdateSetting();

    function handleUpdate(e, setting) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [setting]: value });
    }

    if (isLoading) return <Spinner />;

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    defaultValue={minBookingLength}
                    type="number"
                    id="min-nights"
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    type="number"
                    id="max-nights"
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    defaultValue={maxGuestPerBooking}
                    disabled={isUpdating}
                    type="number"
                    id="max-guests"
                    onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    type="number"
                    id="breakfast-price"
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
