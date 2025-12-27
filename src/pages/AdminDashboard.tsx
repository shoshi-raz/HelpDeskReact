

import { useNavigate } from "react-router-dom";
import AddStatus from "../components/admin/AddStatus";
import Header from "../components/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/joy";
import AddPriority from "../components/admin/AddPriority";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const goToTickets = () => {
    navigate("/tickets"); 
  };
  const goToUsers = () => {
    navigate("/users"); 
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
            <Box>
              <Typography level="h2">Admin Dashboard</Typography>
              <Typography level="body-md" sx={{ color: "text.secondary", mt: 0.5 }}>
                Manage users, tickets, priorities and statuses.
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ alignItems: "stretch" }}
            >
              <Card
                variant="outlined"
                sx={{
                  flex: 1,
                  borderRadius: "lg",
                  bgcolor: "background.surface",
                  boxShadow: "sm",
                }}
              >
                <CardContent>
                  <Typography level="title-md">Quick actions</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary", mt: 0.5 }}>
                    Jump to the areas you use most.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button variant="solid" color="primary" onClick={goToUsers} size="lg">
                      Users
                    </Button>
                    <Button variant="soft" color="neutral" onClick={goToTickets} size="lg">
                      Tickets
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card
                variant="outlined"
                sx={{
                  flex: 2,
                  borderRadius: "lg",
                  bgcolor: "background.surface",
                  boxShadow: "sm",
                }}
              >
                <CardContent>
                  <Typography level="title-md">Statuses</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary", mt: 0.5 }}>
                    Add and manage ticket statuses.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <AddStatus />
                </CardContent>
              </Card>

              <Card
                variant="outlined"
                sx={{
                  flex: 2,
                  borderRadius: "lg",
                  bgcolor: "background.surface",
                  boxShadow: "sm",
                }}
              >
                <CardContent>
                  <Typography level="title-md">Priorities</Typography>
                  <Typography level="body-sm" sx={{ color: "text.secondary", mt: 0.5 }}>
                    Add and manage ticket priorities.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <AddPriority />
                </CardContent>
              </Card>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
