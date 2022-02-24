import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import FilterAlt from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import FilterPage from "../Filter/FilterPage";
import { 
    AppBar, 
    Box, 
    Drawer, 
    Grid, 
    List, 
    Toolbar,
    Typography 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    drawerPaper: {
        width: 'auto'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginLeft: 0,
    },
    titleMenu: {
        padding: '12px'
    }
}));

function ResponsiveDrawer() {
    const triggerRef = useRef(null);
    const nodeRef = useRef(null);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant='h6'>
                            Machine status chart per week
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <FilterAlt />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            
            <nav className={classes.drawer} ref={triggerRef}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <Drawer
                    variant="temporary"
                    open={open}
                    disableEnforceFocus
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    anchor={'right'}
                >
                    <Grid 
                        container 
                        direction="row" 
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <CloseIcon/> 
                        </IconButton>                        
                        <Typography variant="subtitle2" className={classes.titleMenu}>
                            Set Filter to check status machine
                        </Typography>
                    </Grid>
                    <List>
                        <FilterPage/>
                    </List>
                </Drawer>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar}/>
            </div>
        </div>
    );
}
ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default ResponsiveDrawer;