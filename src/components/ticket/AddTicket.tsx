import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creatTicket } from "../../api/service-tickets";
import { Button, Card, FormControl, FormLabel, Option, Input, Select, Stack, Textarea, Typography, Box, FormHelperText } from "@mui/joy";
import { getPriorities } from "../../api/service-priorities";
import { Controller, useForm } from "react-hook-form";
import { toast } from "../../utils/alerts";


interface TicketFormData {
    subject: string;
    description: string;
    priorityId: number;
}

const AddTicket = () => {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<TicketFormData>({
        defaultValues: {
            subject: "",
            description: "",
            priorityId: 2
        }
    });


    const { data: priorities, isLoading: isLoadingP, error: errorP } =
        useQuery({
            queryKey: ["priorities"],
            queryFn: getPriorities,
            staleTime: Infinity
        });

    const mutation = useMutation({
        mutationFn: (data: TicketFormData) =>

            creatTicket(data.subject, data.description, 1, data.priorityId, 1),
        onSuccess: () => {
            toast.success("Ticket created successfully");
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            reset();
        }
    });

    const onSubmit = (data: TicketFormData) => mutation.mutate(data);

    if (errorP) {
        toast.error("Error loading priorities")
        console.error("Error loading priorities", errorP);
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 600, mx: "auto", p: 3, boxShadow: 'md' }}>
            <Typography level="h4" sx={{ mb: 2 }}>Create New Ticket</Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <FormControl error={!!errors.subject}>
                        <FormLabel>Subject</FormLabel>
                        <Controller
                            name="subject"
                            control={control}
                            rules={{ required: "subject is required" }}
                            render={({ field }) => <Input {...field} placeholder="Subject..." />}
                        />
                        {errors.subject && (
                            <FormHelperText sx={{ color: 'danger.500' }}>
                                {errors.subject.message}
                            </FormHelperText>
                        )}
                    </FormControl>


                    <FormControl>
                        <FormLabel>Priority</FormLabel>
                        <Controller
                            name="priorityId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    onChange={(_, val) => field.onChange(val)}
                                    placeholder={isLoadingP ? "Loading..." : "Select Priority"}
                                >
                                    {priorities?.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <FormControl error={!!errors.description}>
                        <FormLabel>Description</FormLabel>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => <Textarea {...field} placeholder="Description..." minRows={4} />}
                        />
                        {errors.description && (
                            <FormHelperText sx={{ color: 'danger.500' }}>
                                {errors.description.message}
                                </FormHelperText>
                        )}
                    </FormControl>

                    <Button type="submit" loading={mutation.isPending} fullWidth>
                        Submit Ticket
                    </Button>
                </Stack>
            </form>
        </Card>
    );
};
export default AddTicket
