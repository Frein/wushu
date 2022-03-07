import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch, withRouter} from "react-router-dom";
import Meridians from "./components/Meridians";
import MeridianBranch from "./components/MeridianBranch";
import EditZone from "./components/EditZone";
import ViewZone1 from "./components/ViewZone1";
import ViewZone2 from "./components/ViewZone2";
import { Person, SentimentVerySatisfied } from "@material-ui/icons";
import { Avatar, Grid, Tooltip, IconButton, Popover, Box, Button, Container, TextField } from "@material-ui/core";
import Zones from "./components/Zones";
import Problem from "./components/Problems/Problem";
import ViewZone3 from "./components/ViewZone3";
import ViewZone4 from "./components/ViewZone4";
import ViewZone5 from "./components/ViewZone5";
import dataService from "./data/dataService";
import CookieParser from "./utils/CookieParser";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth:'95%'
    }
});

function Menu(props) {
    const [nav, setNav] = useState('problems');
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const classes= useStyles();

    const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
     setAnchorElUser(null);
    };

    const handleLoginSubmit = () => {
        dataService('/login', {
            name: nameValue,
            password: passwordValue
        })
    }

    const handleLogout = (e) => {
        dataService('/logout')
          .catch(console.log)
    }

    const handleNameValue = (e) => {
        setNameValue(e.target.value)
    }

    const handlePasswordValue = (e) => {
        setPasswordValue(e.target.value)
    }

    const createLoginPopoverBody = () => {
        const user = CookieParser.getUser()
        return <Container>
            {
                user
                  ? <Box>
                      {user.name}
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogout}
                      >
                          Выйти
                      </Button>
                  </Box>
                  : <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Логин"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={nameValue}
                        onChange={handleNameValue}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={passwordValue}
                        onChange={handlePasswordValue}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Войти
                      </Button>
                  </Box>
            }
        </Container>
    }

    const createLoginAvatar = () => {
         return <Box>
             <Tooltip title="Login">
                 <IconButton
                   onClick={handleOpenUserMenu}
                 >
                     <Avatar>
                         {
                             CookieParser.getUser()?.role === 'admin'
                               ? <SentimentVerySatisfied color="primary" />
                               : <Person color="primary"/>
                         }
                     </Avatar>
                 </IconButton>
             </Tooltip>
             <Popover
               id="user-menu"
               sx={{ mt: '170px' }}
               open={!!anchorElUser}
               onClose={handleCloseUserMenu}
               anchorEl={anchorElUser}
               anchorOrigin={{
                   vertical: 'bottom',
                   horizontal: 'left',
               }}
               keepMounted
               transformOrigin={{
                   vertical: 'bottom',
                   horizontal: 'left'
               }}
             >
                 {createLoginPopoverBody()}
             </Popover>
         </Box>
     }

    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid container justify={'space-between'} alignItems={'center'}>
                <Grid item xs={11}>
                    <BottomNavigation
                      value={nav}
                      onChange={(event, newValue) => {
                          setNav(newValue);
                          switch (newValue) {
                              case 'problems':
                                  props.history.push(`/problems`);
                                  break;
                              case 'meridians':
                                  props.history.push(`/meridians`);
                                  break;
                              case 'zones':
                                  props.history.push(`/zones`);
                                  break;
                              default:
                                  props.history.push(`/problems`);
                          }

                      }}
                      showLabels
                      className={classes.root}
                    >
                        <BottomNavigationAction label="Поиск по проблеме" value={'problems'} />
                        <BottomNavigationAction label="Меридианы" value={'meridians'} />
                        <BottomNavigationAction label="Зоны" value={'zones'} />
                    </BottomNavigation>
                </Grid>
                <Grid item xs={1}>
                    {createLoginAvatar()}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Switch>
                    <Route path="/problems/:id">
                        <Problem />
                    </Route>
                    <Route path="/meridians">
                        <Meridians />
                    </Route>
                    <Route path="/meridianBranch/:id">
                        <MeridianBranch />
                    </Route>
                    <Route path="/developerzone">
                        <EditZone />
                    </Route>
                    <Route path="/zones">
                        <Zones />
                    </Route>
                    <Route path="/lesson2/zones">
                        <ViewZone1 />
                    </Route>
                    <Route path="/lesson5/zones">
                        <ViewZone2 />
                    </Route>
                    <Route path="/lesson7/zones">
                        <ViewZone3 />
                    </Route>
                    <Route path="/lesson9/zones">
                        <ViewZone4 />
                    </Route>
                    <Route path="/lesson11/zones">
                        <ViewZone5 />
                    </Route>
                    <Route path="/">
                        <Problem />
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
};
export default withRouter(Menu);
