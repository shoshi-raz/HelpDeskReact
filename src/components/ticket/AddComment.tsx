import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postComment } from "../../api/service-comments";
import { Input, Box } from "@mui/joy";
import { Button } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({ ticketId, onSuccess }: { ticketId: number; onSuccess: () => void }) => {
    const [text, setText] = useState<string>("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newText: string) => postComment(ticketId, newText),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", ticketId] });
            setText("");
            onSuccess();
        }
    });

    return (
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                fullWidth
                disabled={mutation.isPending} />
            <Button
                variant="contained"
                onClick={() => { mutation.mutate(text); }}
                loading={mutation.isPending}
                disabled={!text.trim() || mutation.isPending}
                endIcon={<SendIcon />}>
                send
            </Button>
        </Box>
    )
}
export default AddComment;