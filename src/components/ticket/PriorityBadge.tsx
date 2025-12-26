import { Box } from "@mui/joy";

interface PriorityBadgeProps {
    priority?: { id: number|null; name: string|null };
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
    const priorityColors: Record<string, string> = {
        low: "success",
        medium: "warning",
        high: "danger",
        critical: "danger",
    };

    const color = priorityColors[priority?.name ?? ""] || "neutral";

    return (
        <Box
            sx={{
                display: "inline-block",
                px: 1.5,
                py: 0.5,
                borderRadius: "md",
                bgcolor: `${color}.100`,
                color: `${color}.700`,
                fontWeight: "bold",
                fontSize: "sm",
            }}
        >
            {priority?.name || "Unknown"}
        </Box>
    );
};

export default PriorityBadge;
