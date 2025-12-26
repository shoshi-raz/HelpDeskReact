import { Box, Button, Typography, Container, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import CoffeeIcon from "@mui/icons-material/Coffee"; // דורש התקנה של @mui/icons-material

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", textAlign: "center" }}
        spacing={4}
      >
        {/* Animated Coffee Icon Section */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Box
            sx={{
              fontSize: "120px",
              color: "neutral.300",
              position: "relative",
              zIndex: 1,
            }}
          >
            <CoffeeIcon sx={{ fontSize: "inherit" }} />
          </Box>
          
          {/* Steam Animations */}
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: -20,
                left: 30 + i * 20,
                width: 4,
                height: 20,
                bgcolor: "neutral.200",
                borderRadius: "50%",
                animation: `steam 2s infinite ease-in-out`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0,
                "@keyframes steam": {
                  "0%": { transform: "translateY(0) scaleX(1)", opacity: 0 },
                  "50%": { transform: "translateY(-20px) scaleX(1.5)", opacity: 0.5 },
                  "100%": { transform: "translateY(-40px) scaleX(2)", opacity: 0 },
                },
              }}
            />
          ))}
        </Box>

        <Stack spacing={1}>
          <Typography
            level="h1"
            sx={{
              fontSize: "8rem",
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(45deg, #3b200c 30%, #a5907e 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </Typography>
          <Typography level="h4" sx={{ color: "text.secondary" }}>
            Out of Caffeine (and Pages)
          </Typography>
          <Typography sx={{ maxWidth: "400px", mx: "auto", mt: 2, color: "text.tertiary" }}>
            The page you are looking for has been spilled, evaporated, or never existed in our menu.
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            size="lg"
            variant="solid"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "xl",
              px: 4,
              boxShadow: "md",
            }}
          >
            Refill & Go Home
          </Button>
          <Button
            size="lg"
            variant="outlined"
            color="neutral"
            onClick={() => navigate(-1)}
            sx={{ borderRadius: "xl", px: 4 }}
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;