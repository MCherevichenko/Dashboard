import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';


const drawerWidth = 240;

export default function Draw() {
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {["Users"].map((text, index) => (
                    <Link to="/users" style={{ textDecoration: 'none' }}>
                        <ListItem >
                            <Button >
                                <ListItemText primary={text} />
                            </Button>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth
                    }
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth
                    }
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
