import * as React from 'react';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useNavigate } from "react-router-dom";


const Navigator  = (data) => {
  const [value, setValue] = React.useState(data.id);
  let navigate = useNavigate();

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
            switch (newValue) {
                case 0:
                    navigate('/')
                    break;
                case 1:
                    navigate('/producer')
                    break;
                case 2:
                    navigate('/deliver')
                    break;
                default:
                break;
            }
            }}
        >
            <BottomNavigationAction label="查询" icon={<SearchIcon />} />
            <BottomNavigationAction label="生产标记" icon={<AddIcon />} />
            <BottomNavigationAction label="配送" icon={<DeliveryDiningIcon />} />
        </BottomNavigation>
    )
}

export default Navigator;