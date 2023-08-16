import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabin = {} }) {
    const { id: editId, ...editValues } = cabin;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();

    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isEditing || isCreating;

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        isEditSession
            ? editCabin(
                  { newCabinData: { ...data, image }, editId },
                  {
                      onSuccess: () => reset(),
                  }
              )
            : createCabin(
                  { ...data, image },
                  {
                      onSuccess: () => reset(),
                  }
              );
    }

    function onError(errors) {
        toast.error("An error occured while submitting the form");
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 2,
                            message: "The capacity should be at least two",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isWorking}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isWorking}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) =>
                            Number(value) <= Number(getValues().regularPrice) ||
                            "Discount should be less than the regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    disabled={isWorking}
                    type="number"
                    id="description"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    disabled={isWorking}
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
