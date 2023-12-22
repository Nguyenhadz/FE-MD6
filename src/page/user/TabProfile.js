import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserDetail from "./UserDetail";
import ChangePassword from "./UserPassword";
import UserProfile from "./UserProfile";

export default function ColorTabs() {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Thông Tin" />
                <Tab value="two" label="Đổi Mật Khẩu" />
            </Tabs>
            {value === "one" && <UserProfile/>}
            {value === "two" && <ChangePassword/>}
        </Box>

    );
}