import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Paper } from '@mui/material'

export function Tabs({ tabList, elevation = 3 }) {
    const [value, setValue] = React.useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Paper
            elevation={elevation}
            sx={{
                width: '100%',
                typography: 'body1',
                '.MuiTabPanel-root': {
                    p: 0,
                },
            }}
        >
            {Array.isArray(tabList) && tabList.length > 0 && (
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            {tabList.map((item, idx) => (
                                <Tab
                                    label={item.label}
                                    value={(idx + 1).toString()}
                                    key={idx}
                                    disabled={item.disabled}
                                />
                            ))}
                        </TabList>
                    </Box>

                    {tabList.map((item, idx) => (
                        <TabPanel value={(idx + 1).toString()} key={idx}>
                            {item.children}
                        </TabPanel>
                    ))}
                </TabContext>
            )}
        </Paper>
    )
}
