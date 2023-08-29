import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useUpdatedUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User successfully updated");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdatingUser };
}
