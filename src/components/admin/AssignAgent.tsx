import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, FormControl, FormLabel, Select, Option, Stack } from "@mui/joy";
import { updateTicket } from "../../api/service-tickets";
import { getUsers } from "../../api/service-users";
import type Ticket from "../../models/Ticket";
import { toast } from "../../utils/alerts";

const AssignAgent = ({ ticket }: { ticket: Ticket }) => {
    const queryClient = useQueryClient();
    const [selectedAgentId, setSelectedAgentId] = useState<number | null>(ticket.assigned_to);

    const { data: users = [], isLoading: loading } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    });
     const agents = users.filter(u => u.role === 'agent');
    const mutation = useMutation({
        mutationFn: async () => {
            if (!selectedAgentId) return;
            
            const result = await toast.confirm("Assigning Agent", "Are you sure you want to change the assigned agent?");
            if (!result||result.isConfirmed===false) throw new Error("Cancelled by user"); 

            return updateTicket(
                ticket.id!,
                ticket.status_id,
                ticket.priority_id,
                selectedAgentId
            );
        },
        onSuccess: () => {
            toast.success("Success", "Agent assigned successfully");
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
        onError: (error: any) => {
            if (error.message !== "Cancelled by user") {
                toast.error("Error", "Could not assign agent");
            }
        }
    });

    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-end', mt: 1 }}>
            <FormControl size="sm">
                <FormLabel>Assign To</FormLabel>
                <Select
                    value={selectedAgentId}
                    placeholder={loading ? "Loading..." : "Choose Agent"}
                    disabled={loading || mutation.isPending}
                    onChange={(_, newValue) => setSelectedAgentId(newValue)}
                    sx={{ minWidth: 180 }}
                >
                    {agents.map((agent) => (
                        <Option key={agent.id} value={agent.id}>
                            {agent.name}
                        </Option>
                    ))}
                </Select>
            </FormControl>
            
            <Button 
                size="sm"
                variant="soft"
                onClick={() => mutation.mutate()}
                loading={mutation.isPending}
                disabled={loading || selectedAgentId === ticket.assigned_to}
            >
                Assign
            </Button>
        </Stack>
    );
};

export default AssignAgent;