import ButtonIcon from "../../ui/ButtonIcon";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
export default function Logout() {
    const { onLogout, isLoading } = useLogout();
    return (
        <ButtonIcon onClick={() => onLogout()}>{isLoading ? <SpinnerMini /> : <>Logout<RiLogoutBoxRLine /></>}</ButtonIcon>
    )
}
