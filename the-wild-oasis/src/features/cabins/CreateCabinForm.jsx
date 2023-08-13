import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    const { mutate, isLoading } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    function onSubmit(data) {
        mutate(data);
    }

    function onError(errors) {
        toast.error("An error occured while submitting the form");
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isLoading}
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
                    disabled={isLoading}
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput disabled={isLoading} id="image" accept="image/*" />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
