import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from "@material-ui/core/Button";
const Header = props => (
    <AppBar position="static">
        <Toolbar style={{justifyContent:'space-around'}}>
            <Typography variant="h6">
                Task Book
            </Typography>
            <div style={{float: 'right'}}>
                {props.isLogin ? (
                    <IconButton
                        aria-label="Account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={props.logout}
                    >
                        <AccountCircle />
                    </IconButton>
                ):(
                    <Button color={'inherit'}
                        onClick={props.showLoginScreen}
                    >
                        Login
                    </Button>
                )}
            </div>


        </Toolbar>
    </AppBar>
    );

export default Header;
