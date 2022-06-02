import { useContext } from "react";
import { AuthContext } from "../containers/PrivateContainer";

export function useAuth() {
    return useContext(AuthContext);
}