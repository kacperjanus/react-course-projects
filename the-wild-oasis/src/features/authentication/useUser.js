import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    const {
        isLoading,
        data: user,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    if (error) throw new Error(error.message);

    return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
