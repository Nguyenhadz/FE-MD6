import * as React from 'react';
import {styled} from '@mui/system';
import {Tabs as BaseTabs} from '@mui/base/Tabs';
import {TabsList as BaseTabsList} from '@mui/base/TabsList';
import {TabPanel as BaseTabPanel} from '@mui/base/TabPanel';
import {buttonClasses} from '@mui/base/Button';
import {Tab as BaseTab, tabClasses} from '@mui/base/Tab';
import CreateQuestionOneAnswer from "./CreateQuestionOneAnswer";
import CreateQuestionTrueFalse from "./CreateQuestionTrueFalse";
import CreateQuestionMultilAnswer from "./CreateQuestionMultilAnswer";

export default function CreateQuestion() {
    return (
        <Tabs orientation="vertical"  sx={{width: "100%", height: "full"}}>
            <TabsList>
                <Tab>Một đáp án</Tab>
                <Tab>Chọn đúng sai</Tab>
                <Tab>Nhiều đáp án</Tab>
            </TabsList>
            <TabPanel value={0}
                      sx={{width: "92.42%", height: "full"}}>
                <CreateQuestionOneAnswer/>
            </TabPanel>
            <TabPanel value={1}
                      sx={{width: "100%", height: "full"}}>

                <CreateQuestionTrueFalse/>
            </TabPanel>
            <TabPanel value={2}
                      sx={{width: "92.42%", height: "full"}}>
                <CreateQuestionMultilAnswer/>
            </TabPanel>
        </Tabs>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Tab = styled(BaseTab)`
    font-family: 'IBM Plex Sans', sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 4px;
    border: none;
    border-radius: 4px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${blue[400]};
    }

    &:focus {
        color: #fff;
        outline: ${blue[200]};
    }

    &.${buttonClasses.focusVisible} {
        background-color: #fff;
        color: ${blue[600]};
    }

    &.${tabClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &.${tabClasses.selected} {
        background-color: #fff;
        color: ${blue[600]};
    }
`;

const TabPanel = styled(BaseTabPanel)`
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
`;

const Tabs = styled(BaseTabs)`
    display: flex;
    gap: 4px;
    width: 0px;
`;

const TabsList = styled(BaseTabsList)(
    ({theme}) => `
  min-width: 100px;
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  padding: 4px;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);