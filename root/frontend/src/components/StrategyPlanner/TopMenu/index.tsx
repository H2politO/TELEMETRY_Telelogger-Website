import React, { CSSProperties, Component } from "react";
import {Create, SendToMobile, Settings, Add, FileUpload, Save, Construction} from "@mui/icons-material"
import {  MenuItem, Divider } from "@mui/material";
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';

const divStyle:CSSProperties = {
    position: "absolute",
    top: "10%",
    right: "200px",
    zIndex: "10",
    width: "150px",
    height: "50px",
    borderRadius: "20px",
    textAlign: "center",
    display: "flex", 
    alignItems: "center",

}

const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));




export const TopMenu = ({setAct, menuUp, setMenu}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleButton = (event) =>{
        console.log(event.currentTarget.dataset.action);
        setAct(event.currentTarget.dataset.action as string);
        setMenu(!menuUp); //Force update
        handleClose();
    }


    
    return (
        <div style={divStyle}>
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            >        
            <Construction/> 
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleButton} disableRipple data-action={"load"}>
            <FileUpload/>
            Load Map
            </MenuItem>
            <MenuItem onClick={handleButton} disableRipple data-action={"save"}>
            <Save/>
            Save Map
            </MenuItem>
            <MenuItem onClick={handleButton} disableRipple data-action={"create"}>
            <Add/>
            Create Map 
            </MenuItem>
            <MenuItem onClick={handleButton} disableRipple data-action={"edit"}>
            <Create/>
            Edit Map
            </MenuItem>
            <Divider sx={{ my: 0.5 , bgcolor: "black"}} />
            <MenuItem onClick={handleButton} disableRipple data-action={"setting"}>
            <Settings/>
            Settings
            </MenuItem>

            
            </StyledMenu>
        </div>
    )
}

export default TopMenu