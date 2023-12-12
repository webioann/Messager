import { useContext } from "react";
import { ColorSchemeContext } from "../context/ColorSchemeContext";

function useColorSchemeContext() { // <--- custom hook for current user context
    const context = useContext(ColorSchemeContext)
    if (context === null) {
        throw new Error('useUserContext is brocken')
    }
    return context
};
export default useColorSchemeContext;
