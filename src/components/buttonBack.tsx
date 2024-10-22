import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NavigateButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/selec");
  };

  return (
    <div className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-15wfblr-MuiButtonBase-root-MuiIconButton-root">
        <ArrowBackIcon
          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-15wfblr-MuiButtonBase-root-MuiIconButton-rootMuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-49adnf-MuiSvgIcon-root"
          color="primary"
          onClick={handleClick}
        />
    </div>
)};

export default NavigateButton;
