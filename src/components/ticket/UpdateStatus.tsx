
import { Button, FormControl, FormLabel } from "@mui/joy"
import { Stack, Select, Option } from "@mui/joy";
import { updateTicket } from "../../api/service-tickets";
import type Ticket from "../../models/Ticket";
import { useState, type FormEvent } from "react";
import { getStatuses } from "../../api/service-statuses";
import { toast } from "../../utils/alerts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UpdateStatus = ({ ticket }: {  ticket: Ticket }) => {

    const [selectedStatusID, setSelectedStatusID] = useState<number | null>(ticket.status_id);
   

    const { data: statusList = [], isLoading: loading } = useQuery({
        queryKey: ["statuses"],
        queryFn: getStatuses
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => updateTicket(ticket.id!, selectedStatusID!, 1, ticket.assigned_to ?? 1),
        onSuccess: () => {
            toast.success("Status updated successfully");
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
        onError: () => {
            toast.error("Update failed");
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedStatusID) mutation.mutate();
    };

   

    return (<>
        <form
            onSubmit={handleSubmit}
        >
            <Stack spacing={2} sx={{ alignItems: 'flex-start' ,gap:1,mt:2}}>
                <FormControl>
                    <FormLabel>update status</FormLabel>
                    <Select
                        value={selectedStatusID}
                        placeholder={loading ? "loading" : ticket.status_name}
                        disabled={loading || mutation.isPending}
                        sx={{ minWidth: 200 }}

                        onChange={(_, v) => {
                            if (v)
                                setSelectedStatusID(v)
                        }}
                    >

                        {statusList.map(
                            (s) => (
                                <Option key={s.id} value={s.id} >
                                    {s.name}
                                </Option>
                            ))}

                    </Select>
                </FormControl>
                <Button type="submit"
                    loading={mutation.isPending}
                    disabled={selectedStatusID === ticket.status_id}
                >save changes</Button>
            </Stack>
        </form>

    </>)
}
export default UpdateStatus;
