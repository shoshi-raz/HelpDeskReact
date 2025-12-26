import { Box, Table, Typography, Sheet, Button, Container, Stack, Select,Option } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/service-users";
import LoadingSpinner from "../UI/LoadSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import AddUser from "./AddUser";
import { useState } from "react";
import type { UserRole } from "../../models/User";
import { useMatch, useNavigate } from "react-router-dom";
import Header from "../Header";

const UsersList = () => {
        const navigate = useNavigate();
const isNewUser = useMatch("/users/new");

    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const { data: users = [], isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message="Error loading users." />;

    const filteredUsers = roleFilter === 'all'
        ? users
        : users.filter(user => user.role === roleFilter);

    return (
        <>
        <Header/>
        <Container sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography level="h2">users</Typography>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={() => navigate(isNewUser? "/users":"/users/new")}
                >
                    {isNewUser ? "close form" : "add new user"}
                </Button>
            </Box>

            {isNewUser && (
                <Sheet variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 'md', boxShadow: 'sm' }}>
                    <AddUser onSuccess={() => navigate("/users")} />
                </Sheet>
            )}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography level="body-md" sx={{ fontWeight: 'bold' }}>Filter by Role:</Typography>
                <Select
                    value={roleFilter}
                    onChange={(_, newValue) => setRoleFilter(newValue as UserRole | 'all')}
                    sx={{ width: 200 }}
                >
                    <Option value="all">All Roles</Option>
                    <Option value="admin">Admin</Option>
                    <Option value="agent">Agent</Option>
                    <Option value="customer">Customer</Option>
                </Select>
                
                <Typography level="body-xs" sx={{ ml: 'auto' }}>
                    Showing {filteredUsers.length} users
                </Typography>
            </Stack>

            <Sheet variant="outlined" sx={{ borderRadius: 'sm', overflow: 'auto' }}>
                <Table stripe="odd" hoverRow>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>role</th>
                            <th>create at </th>
                        </tr>
                    </thead>
                    <tbody>
                       {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                                    <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                    No users found for this role.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Sheet>
        </Container>
        </>
    );
};

export default UsersList;