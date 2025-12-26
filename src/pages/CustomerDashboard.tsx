import { Box, Button, Card, CardContent, Divider, Link, Stack, Typography } from "@mui/joy";
import Header from "../components/Header";



const CustomerDashboard = () => {

    return (
        <>
        <Header />
        <Box sx={{ minHeight: "100vh", bgcolor: "background.body" }}>
            <Box
                sx={{
                    maxWidth: 1120,
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    py: { xs: 3, sm: 4 },
                }}
            >
                <Stack spacing={{ xs: 2.5, sm: 3 }}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
                    >
                        <Box>
                            <Typography level="h2">Customer Dashboard</Typography>
                            <Typography level="body-md" sx={{ color: "text.secondary", mt: 0.5 }}>
                                Track your tickets and updates.
                            </Typography>
                        </Box>
                       
                    </Stack>

                    <Card
                        variant="outlined"
                        sx={{ borderRadius: "lg", bgcolor: "background.surface", boxShadow: "sm" }}
                    >
                        <CardContent>
                            <Typography level="title-md">My tickets</Typography>
                            <Typography level="body-sm" sx={{ color: "text.secondary", mt: 0.5 }}>
                                View all your submitted tickets in one place.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Button
                                component={Link}
                                href="/tickets"
                                variant="solid"
                                color="primary"
                                size="lg"
                                sx={{ width: { xs: "100%", sm: "auto" } }}
                            >
                                View My Tickets
                            </Button>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Box>
        </>
    );
}
export default CustomerDashboard;