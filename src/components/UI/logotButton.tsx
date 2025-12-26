import { useAuth } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/joy/Button';


const LogoutButton = () => {
    const auth = useAuth();
    return (
        <Button
            variant="soft"
            color="danger"
            size="sm"
            startDecorator={<LogoutIcon />}
            onClick={auth.Logout}
        >
            logout
        </Button>
    )

}
export default LogoutButton