// ShowComment.tsx
import { Box, Sheet, Typography } from "@mui/joy";

import type Comment from "../../models/Comment";    

const ShowComment = ({ comment }: { comment: Comment }) => {
    return (
        <Sheet variant="soft" sx={{ p: 2, borderRadius: 'md' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography level="title-sm" color="primary">
                    {comment.author_name || "unknown"}
                </Typography>
                <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                    {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : ""}
                </Typography>
            </Box>
            <Typography level="body-sm" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                {comment.content}
            </Typography>

        </Sheet>
    );
};

export default ShowComment;