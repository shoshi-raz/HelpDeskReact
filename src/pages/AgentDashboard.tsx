import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/joy";
import Header from "../components/Header";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const goToTickets = () => {
    navigate("/tickets"); 
  };

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
                <Typography level="h2">Agent Dashboard</Typography>
                <Typography level="body-md" sx={{ color: "text.secondary", mt: 0.5 }}>
                  Review and manage assigned tickets.
                </Typography>
              </Box>

            </Stack>

            <Card
              variant="outlined"
              sx={{ borderRadius: "lg", bgcolor: "background.surface", boxShadow: "sm" }}
            >
              <CardContent>
                <Typography level="title-md">Quick actions</Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary", mt: 0.5 }}>
                  Go straight to ticket management.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Button variant="solid" color="primary" size="lg" onClick={goToTickets}>
                  Go to Tickets
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AgentDashboard;
