import { Box, Divider, Sheet, Stack, Typography } from "@mui/joy";
import ShowComment from "./ShowComment";
import type Comment from "../../models/Comment";
import AddComment from "./AddComment";
import { useAuth } from "../../context/AuthContext";
import { Forum } from "@mui/icons-material";

const CommentList = ({ comments, ticketId }: { comments: Comment[], ticketId: number }) => {
    const { user } = useAuth();

    return (
        <Sheet
            variant="soft"
            sx={{
                width: '100%',
                borderRadius: 'lg',
                p: { xs: 1.5, md: 3 },
                mt: 2,
                bgcolor: 'background.level1',
                border: '1px solid',
                borderColor: 'divider'
            }}
        >
            {/* Chat Header Info */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <Forum sx={{ color: 'primary.500', fontSize: 20 }} />
                <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                    Discussion Thread
                </Typography>
            </Stack>

            {/* Comments Area */}
            {comments.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography level="body-sm" sx={{ color: 'text.tertiary', fontStyle: 'italic' }}>
                        No messages yet. Start the conversation below.
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={2} sx={{ mb: 3 }}>
                    {comments.map((c) => {
                        // Check if the comment was written by the current logged-in user
                        const isMe = c.author_id === user?.id;
                        
                        return (
                            <Box
                                key={c.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isMe ? 'flex-end' : 'flex-start',
                                    width: '100%',
                                }}
                            >
                                <Box sx={{ maxWidth: '85%' }}>
                                    <ShowComment comment={c} />
                                </Box>
                            </Box>
                        );
                    })}
                </Stack>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Input Area */}
            <Box sx={{ bgcolor: 'white', p: 1, borderRadius: 'md', boxShadow: 'sm' }}>
                <AddComment ticketId={ticketId} onSuccess={() => {}} />
            </Box>
        </Sheet>
    );
}

export default CommentList;



