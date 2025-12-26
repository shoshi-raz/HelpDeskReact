
import { Box, Button, Card, CardActions, CardContent, Typography, Divider, Stack, Chip } from "@mui/joy";
import type Ticket from "../../models/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getCommentsByTicketId } from "../../api/service-comments";
import CommentList from "./CommentList";
import UpdateStatus from "./UpdateStatus";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import AssignAgent from "../admin/AssignAgent";
import DeleteTicket from "./DeleteTicket";
import { useNavigate, useParams } from "react-router-dom";
import { ChatBubbleOutline, PersonOutline, SupportAgent, History } from '@mui/icons-material';

const ShowTicket = ({ ticket }: { ticket: Ticket }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const isOpen = String(ticket.id) === id;

    const { data: comments = [] } = useQuery({
        queryKey: ["comments", ticket.id],
        queryFn: () => getCommentsByTicketId(ticket.id!),
        refetchInterval: 10000,
    });

    return (
        <Card 
            variant="outlined" 
            sx={{ 
                width: '100%', 
                maxWidth: 800, 
                mx: 'auto', 
                my: 2, 
                boxShadow: 'sm', 
                borderRadius: 'lg',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { boxShadow: 'md' }
            }}
        >
            <Box sx={{ height: 4, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }} />

            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                    <Box>
                        <Typography level="h4" sx={{ fontWeight: 'bold', color: 'neutral.800', mb: 1 }}>
                            {ticket.subject}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <StatusBadge status={{ id: ticket.status_id, name: ticket.status_name }} />
                            <PriorityBadge priority={{ id: ticket.priority_id, name: ticket.priority_name }} />
                        </Stack>
                    </Box>
                    <Typography level="body-xs" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.tertiary' }}>
                        <History sx={{ fontSize: 16 }} />
                        {ticket.updated_at
                            ? `Updated: ${new Date(ticket.updated_at).toLocaleDateString()}`
                            : `Created: ${new Date(ticket.created_at || '').toLocaleDateString()}`}
                    </Typography>
                </Stack>

                <Typography sx={{ color: 'neutral.700', lineHeight: 1.6, mb: 3 }}>
                    {ticket.description}
                </Typography>

                <Divider inset="none" />

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonOutline sx={{ color: 'text.tertiary', fontSize: 20 }} />
                            <Typography level="body-xs"><b>From:</b> {ticket.created_by}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SupportAgent sx={{ color: 'text.tertiary', fontSize: 20 }} />
                            <Typography level="body-xs"><b>Agent:</b> {ticket.assigned_to || "Waiting..."}</Typography>
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>

            <CardActions 
                buttonFlex="none"
                sx={{ 
                    p: 2, 
                    bgcolor: 'background.level1', 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1.5,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Stack direction="row" spacing={1} sx={{ mr: 'auto', alignItems: 'center' }}>
                    {(user?.role === "agent" || user?.role === "admin") && (
                        <UpdateStatus ticket={ticket} />
                    )}
                    {(user?.role === "admin") && (
                        <>
                            <AssignAgent ticket={ticket} />
                            <DeleteTicket ticketId={ticket.id!} />
                        </>
                    )}
                </Stack>

                <Button 
                    variant={isOpen ? "solid" : "soft"}
                    color="primary"
                    startDecorator={<ChatBubbleOutline />}
                    onClick={() => navigate(isOpen ? "/tickets" : `/tickets/${ticket.id}`)}
                    sx={{ 
                        borderRadius: 'md',
                        boxShadow: isOpen ? 'sm' : 'none'
                    }}
                >
                    {isOpen ? "Hide Comments" : `Comments (${comments.length})`}
                </Button>
            </CardActions>

            {isOpen && (
                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'white' }}>
                    <CommentList comments={comments} ticketId={ticket.id!} />
                </Box>
            )}
        </Card>
    );
};

export default ShowTicket;
