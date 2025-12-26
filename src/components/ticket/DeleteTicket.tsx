import { Button } from "@mui/joy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket } from "../../api/service-tickets";
import { toast } from "../../utils/alerts";

interface DeleteTicketProps {
    ticketId: number;
}

const DeleteTicket = ({ ticketId }: DeleteTicketProps) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteTicket(ticketId),
        onSuccess: () => {
        toast.success("success delete","the ticket is deleted ")
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
        },
        onError: (error) => {
            toast.error("Delete failed","please try again")
            console.error("Delete failed:", error);
        }
        
    });

    const handleDelete =async () => {
     const isConfirmed = await toast.confirm("Delete ticket","are you sure?")
        if (!isConfirmed||isConfirmed.isConfirmed===false) return;
        mutate();

    };

    return (
        <Button 
            color="danger" 
            variant="soft" 
            loading={isPending} 
            onClick={handleDelete}
        >
            Delete
        </Button>
    );
};

export default DeleteTicket;