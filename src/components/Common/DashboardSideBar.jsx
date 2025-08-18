import { primaryLogo } from 'constants/common'
import {
  alpha,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Fragment } from 'react'

DashboardSideBar.propTypes = {
  navList: PropTypes.array,
}

export function DashboardSideBar({ navList }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      sx={{
        '.MuiDrawer-paper': {
          width: 200,
          py: 2,
          backgroundColor: '#121621',
          color: '#b3b9d6',
          '.MuiSvgIcon-root ': {
            color: '#b3b9d6',
          },
        },
      }}
    >
      <Box sx={{ px: 4 }}>
        <Box component="img" src={primaryLogo} width="100px" />
      </Box>

      <List>
        {Array.isArray(navList) &&
          navList.map((item, idx) => (
            <Fragment key={idx}>
              {item.hasPermission && (
                <ListItem
                  sx={{
                    '.active': {
                      '.MuiButtonBase-root': {
                        color: 'white',
                        '.MuiSvgIcon-root': {
                          color: 'white',
                        },

                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.7),
                      },
                    },
                  }}
                >
                  <Box
                    component={NavLink}
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    sx={{ width: '100%' }}
                  >
                    <ListItemButton
                      sx={{
                        alignItems: 'center',
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                        },
                      }}
                    >
                      {item.icon}
                      <ListItemText
                        sx={{ ml: 1.5 }}
                        primary={`${item.label
                          .charAt(0)
                          .toUpperCase()}${item.label.slice(1)}`}
                      />
                    </ListItemButton>
                  </Box>
                </ListItem>
              )}
            </Fragment>
          ))}
      </List>
    </Drawer>
  )
}
