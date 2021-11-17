import * as React from 'react';
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const Navigator  = (data) => {
  const [value, setValue] = React.useState(data.id);

    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
            switch (newValue) {
                case 0:
                    window.location.href = '/';
                    break;
                case 1:
                    window.location.href = '/producer';
                    break;
                case 2:
                    window.location.href = '/deliver';
                    break;
                default:
                break;
            }
            }}
        >
            <BottomNavigationAction label="Find" icon={<SearchIcon />} />
            <BottomNavigationAction label="Produce" icon={<AddIcon />} />
            <BottomNavigationAction label="Deliver" icon={<DeliveryDiningIcon />} />
        </BottomNavigation>
    )
}

export default Navigator;