import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToogle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
        </ButtonIcon>
    );
}

export default DarkModeToogle;
