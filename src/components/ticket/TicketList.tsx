import { Alert, Button, Container, FormControl, FormLabel, Select, Stack, Typography, Option } from "@mui/joy";
import type Ticket from "../../models/Ticket";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../api/service-tickets";
import LoadingSpinner from "../UI/LoadSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import ShowTicket from "./ShowTicket";
import AddTicket from "./AddTicket";
import { useMatch, useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Header from "../Header";

const TicketList = () => {

    const navigate = useNavigate();
    const isNewTicket = useMatch("/tickets/new");
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("newest");


    const {
        data: tickets = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tickets"],
        queryFn: getTickets,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error)
        return <ErrorMessage message="Error loading tickets." />;

    const ticketExists = id
        ? tickets.some(t => String(t.id) === id)
        : true;
    if (id && !ticketExists) {
        return <Navigate to="/404" replace />;
    }


    let filteredTickets = [...tickets];


    if (statusFilter !== "all") {
        filteredTickets = filteredTickets.filter(t => t.status_name?.toLowerCase() === statusFilter);
    }

    filteredTickets.sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();

        if (sortBy === "newest") return dateB - dateA;
        if (sortBy === "oldest") return dateA - dateB;
        if (sortBy === "priority") return (b.priority_id || 0) - (a.priority_id || 0);
        return 0;
    });





    return (
        <>
        <Header />
            {isLoading && <LoadingSpinner />}
            {!isLoading && (
                <Container sx={{ py: 4 }}>
                    <Typography level="h2" sx={{ mb: 3 }}>Tickets</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4, alignItems: 'flex-end' }}>
                        {(user?.role == "customer") && <Button variant="outlined"
                            onClick={() => {
                                navigate(isNewTicket ? "/tickets" : "/tickets/new");
                            }}
                        >
                            {isNewTicket ? "hide" : "new"}
                        </Button>}

                        <FormControl size="sm" sx={{ width: 160 }}>
                            <FormLabel>Filter Status</FormLabel>
                            <Select value={statusFilter} onChange={(_, v) => setStatusFilter(v || "all")}>
                                <Option value="all">All Statuses</Option>
                                <Option value="new">New</Option>
                                <Option value="open">Open</Option>
                                <Option value="closed">Closed</Option>
                            </Select>
                        </FormControl>

                        <FormControl size="sm" sx={{ width: 160 }}>
                            <FormLabel>Sort By</FormLabel>
                            <Select value={sortBy} onChange={(_, v) => setSortBy(v || "newest")}>
                                <Option value="newest">Newest First</Option>
                                <Option value="oldest">Oldest First</Option>
                                <Option value="priority">Highest Priority</Option>
                            </Select>
                        </FormControl>


                        <Typography level="body-xs" sx={{ ml: 'auto', alignSelf: 'center' }}>
                            Showing {filteredTickets.length} tickets
                        </Typography>
                    </Stack>
                    {isNewTicket && <Alert> <AddTicket /></Alert>}
                    <Stack spacing={3} sx={{ mt: 4 }}>
                        {filteredTickets.map((ticket: Ticket) => (
                            <ShowTicket key={ticket.id} ticket={ticket} />
                        ))}
                    </Stack>
                </Container>
            )}
            {!isLoading && filteredTickets.length === 0 && (
                <Typography
                    level="body-xs"
                    sx={{ p: 2, color: 'text.secondary' }}>
                    No tickets available.
                </Typography>
            )}
        </>);
}

export default TicketList;