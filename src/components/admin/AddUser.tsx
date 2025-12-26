// import {Button,FormControl,FormLabel,Input,Stack,Typography,FormHelperText,Select,Option} from "@mui/joy";
// import { useForm, Controller } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createUser } from "../../api/service-users";
// import { toast } from "../../utils/alerts";
// import type { UserRole } from "../../models/User";

// interface AddUserFormInputs {
//     name: string;
//     email: string;
//     password: string;
//     role: UserRole
// }

// interface AddUserProps {
//     onSuccess?: () => void;
// }


// const AddUser = ({ onSuccess }: AddUserProps) => {
//     const queryClient = useQueryClient();

//     const {
//         control,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm<AddUserFormInputs>({
//         defaultValues: {
//             name: "",
//             email: "",
//             password: "",
//             role: "customer"
//         }
//     });

//     const mutation = useMutation({
//         mutationFn: (data: AddUserFormInputs) =>
//             createUser(data.name, data.email, data.password, data.role as string),
//         onSuccess: () => {
//             toast.success("Success", "User created successfully");
//             queryClient.invalidateQueries({ queryKey: ["users"] });
//             reset();
//             if (onSuccess) onSuccess();
//         },
//         onError: (error: any) => {
//             toast.error("Error", error.response?.data?.message || "Failed to create user");
//         }
//     });

//     const onSubmit = (data: AddUserFormInputs) => {
//         mutation.mutate(data);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack spacing={2}>
//                 <Typography level="h4" sx={{ mb: 1 }}>Add New User</Typography>

//                 <FormControl error={!!errors.name}>
//                     <FormLabel>Full Name</FormLabel>
//                     <Controller
//                         name="name"
//                         control={control}
//                         rules={{ required: "Name is required" }}
//                         render={({ field }) => <Input {...field} placeholder="John Doe" />}
//                     />
//                     {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
//                 </FormControl>


//                 <FormControl error={!!errors.email}>
//                     <FormLabel>Email</FormLabel>
//                     <Controller
//                         name="email"
//                         control={control}
//                         rules={{
//                             required: "Email is required",
//                             pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
//                         }}
//                         render={({ field }) => <Input {...field} type="email" placeholder="email@example.com" />}
//                     />
//                     {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
//                 </FormControl>


//                 <FormControl error={!!errors.role}>
//                     <FormLabel>Role</FormLabel>
//                     <Controller
//                         name="role"
//                         control={control}
//                         rules={{ required: "Please select a role" }}
//                         render={({ field }) => (
//                             <Select
//                                 {...field}
//                                 placeholder="Select a role"
//                                 onChange={(_, newValue) => field.onChange(newValue)}
//                                 value={field.value}
//                             >
//                                 <Option value="customer">Customer</Option>
//                                 <Option value="agent">Agent</Option>
//                                 <Option value="admin">Admin</Option>
//                             </Select>
//                         )}
//                     />
//                     {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
//                 </FormControl>


//                 <FormControl error={!!errors.password}>
//                     <FormLabel>Password</FormLabel>
//                     <Controller
//                         name="password"
//                         control={control}
//                         rules={{
//                             required: "Password is required",
//                             minLength: { value: 6, message: "At least 6 characters" }
//                         }}
//                         render={({ field }) => <Input {...field} type="password" placeholder="Minimum 6 chars" />}
//                     />
//                     {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
//                 </FormControl>

//                 <Button
//                     type="submit"
//                     loading={mutation.isPending}
//                     variant="solid"
//                     color="primary"
//                     sx={{ mt: 1 }}
//                 >
//                     Create User
//                 </Button>
//             </Stack>
//         </form>
//     );
// };

// export default AddUser;

import { 
    Button, FormControl, FormLabel, Input, Stack, Typography, 
    FormHelperText, Select, Option, Sheet, Divider, Box 
} from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../api/service-users";
import { toast } from "../../utils/alerts";
import type { UserRole } from "../../models/User";
import { PersonAdd, Badge, Email, Lock, AssignmentInd } from '@mui/icons-material';

interface AddUserFormInputs {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

interface AddUserProps {
    onSuccess?: () => void;
}

const AddUser = ({ onSuccess }: AddUserProps) => {
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<AddUserFormInputs>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "customer"
        }
    });

    const mutation = useMutation({
        mutationFn: (data: AddUserFormInputs) =>
            createUser(data.name, data.email, data.password, data.role as string),
        onSuccess: () => {
            toast.success("Success", "User created successfully");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            reset();
            if (onSuccess) onSuccess();
        },
        onError: (error: any) => {
            toast.error("Error", error.response?.data?.message || "Failed to create user");
        }
    });

    const onSubmit = (data: AddUserFormInputs) => {
        mutation.mutate(data);
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 500,
                mx: 'auto',
                p: 4,
                borderRadius: 'lg',
                boxShadow: 'md',
                bgcolor: 'background.surface'
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5}>
                    <Box sx={{ mb: 1, textAlign: 'center' }}>
                        <PersonAdd sx={{ fontSize: 40, color: 'primary.500', mb: 1 }} />
                        <Typography level="h3" fontWeight="xl">
                            Create Account
                        </Typography>
                        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                            Register a new user to the system
                        </Typography>
                    </Box>

                    <Divider inset="none" />

                    <FormControl error={!!errors.name}>
                        <FormLabel>Full Name</FormLabel>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    startDecorator={<Badge />} 
                                    placeholder="Enter full name" 
                                />
                            )}
                        />
                        {errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                    </FormControl>

                    <FormControl error={!!errors.email}>
                        <FormLabel>Email Address</FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                            }}
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type="email" 
                                    startDecorator={<Email />} 
                                    placeholder="email@example.com" 
                                />
                            )}
                        />
                        {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                    </FormControl>

                    <FormControl error={!!errors.role}>
                        <FormLabel>System Role</FormLabel>
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Please select a role" }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select a role"
                                    startDecorator={<AssignmentInd />}
                                    onChange={(_, newValue) => field.onChange(newValue)}
                                    value={field.value}
                                >
                                    <Option value="customer">Customer</Option>
                                    <Option value="agent">Support Agent</Option>
                                    <Option value="admin">Administrator</Option>
                                </Select>
                            )}
                        />
                        {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
                    </FormControl>

                    <FormControl error={!!errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" }
                            }}
                            render={({ field }) => (
                                <Input 
                                    {...field} 
                                    type="password" 
                                    startDecorator={<Lock />} 
                                    placeholder="Minimum 6 characters" 
                                />
                            )}
                        />
                        {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                    </FormControl>

                    <Button
                        type="submit"
                        loading={mutation.isPending}
                        fullWidth
                        variant="solid"
                        sx={{ 
                            mt: 1,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            }
                        }}
                    >
                        Create User
                    </Button>
                </Stack>
            </form>
        </Sheet>
    );
};

export default AddUser;