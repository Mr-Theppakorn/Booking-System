import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from './ButtonIcon'
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <FiSun /> : <FaRegMoon />}
        </ButtonIcon>
    )
}
