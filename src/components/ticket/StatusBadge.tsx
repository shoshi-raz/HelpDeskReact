import { Box } from "@mui/joy";

interface StatusBadgeProps {
    status?: { id: number|null; name: string |null};
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const statusColors: Record<string, string> = {
        open: "success",
        closed: "neutral",
        pending: "warning",
        resolved: "info",
    };

    const color = statusColors[status?.name ?? ""] || "neutral";

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
            {status?.name || "Unknown"}
        </Box>
    );
};

export default StatusBadge;
