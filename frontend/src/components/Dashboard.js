import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { gql, useQuery, useMutation } from "@apollo/client";
import { useMemo } from "react";

import Draw from "./Draw";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: "#fcd9e1",
    padding: theme.spacing(1),
    margin: "auto"
}));

const mutation = gql`
    mutation Mutation($userId: ID!) {
        promoteToAdmin(userId: $userId)
    }
`

const PromoteToAdminButton = ({ userId, onPromoteFinish }) => {
    const [promoteToAdmin] = useMutation(mutation);
    const handleClick = async () => {
        await promoteToAdmin({
            variables: {
                userId,
            }
        });
        onPromoteFinish();
    };

    return (<Button variant="contained" onClick={handleClick}>Promote to Admin</Button>)
}

const drawerWidth = 240;

const GET_USERS = gql`
  query GetUsers {
    users {
      id: _id
      email
      role
    }
  }
`;

export default function Dashboard() {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const users = data && data.users;

    const columns = useMemo(() => ([
        {
            field: 'email',
            headerName: 'Email',
            type: 'string',
            width: 160,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'string',
            width: 160,
            editable: false,
        },
        {
            field: '',
            headerName: 'Action',
            width: 160,
            editable: false,
            renderCell: (Partner) => {
                const { row: { id, role } } = Partner;
                return role === 'USER' ? <PromoteToAdminButton userId={id} onPromoteFinish={refetch} /> : <Div>Already admin</Div>
            }
        },
    ]), [refetch]);
    
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Draw />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` }
                    }}
                >
                    <Toolbar />
                    {/* // my content */}
                    <div id="data" style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[7]}
                            disableSelectionOnClick
                            disableColumnSelector
                            disableExtendRowFullWidth
                        />
                    </div>
                </Box>
            </Box>



        </>
    )
}
