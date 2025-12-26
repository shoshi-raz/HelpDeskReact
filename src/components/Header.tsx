import { useState } from 'react';
import { Box, Button, Stack, Typography, Sheet, Avatar, Dropdown, Menu, MenuButton, MenuItem, IconButton, Divider } from "@mui/joy";
import { Menu as MenuIcon, Close as CloseIcon, Settings, HelpOutline, Person, Dashboard, Logout as LogoutIcon, ConfirmationNumber, People } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    Logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const items = [];
    if (user?.role === 'admin') {
      items.push(
        { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
        { label: 'Users', path: '/users', icon: <People /> },
        { label: 'Tickets', path: '/tickets', icon: <ConfirmationNumber /> }
      );
    } else if (user?.role === 'agent') {
      items.push(
        { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
        { label: 'Tickets', path: '/tickets', icon: <ConfirmationNumber /> }
      );
    } else if (user?.role === 'customer') {
      items.push(
        { label: 'My Tickets', path: '/tickets', icon: <ConfirmationNumber /> }
      );
    }
    return items;
  };

  const roleColors: Record<string, string> = {
    admin: 'danger',
    agent: 'primary',
    customer: 'success'
  };

  const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    agent: 'Support Agent',
    customer: 'Customer'
  };

  if (!user) return null;

  return (
    <Sheet
      sx={{
        width: '100%',
        bgcolor: 'background.surface',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        boxShadow: 'sm',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // Standard LTR layout
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 }, 
          py: 1,
          width: '100%',
        }}
      >
        {/* Logo - Left Side */}
        <Box
          onClick={() => handleNavigate('/')}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 'xl',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'sm',
            }}
          >
            <ConfirmationNumber sx={{ color: 'white' }} />
          </Box>
          <Box>
            <Typography level="title-lg" sx={{ fontWeight: 'bold', color: 'primary.plainColor', lineHeight: 1 }}>
              TicketHub
            </Typography>
            <Typography level="body-xs">Service Management</Typography>
          </Box>
        </Box>

        {/* Navigation - Center */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, flexGrow: 1 }}
        >
          {getNavItems().map((item) => (
            <Button
              key={item.path}
              variant="plain"
              color="neutral"
              startDecorator={item.icon}
              onClick={() => handleNavigate(item.path)}
              sx={{ fontWeight: 500 }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        {/* User Menu - Right Side */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton variant="plain" color="neutral" sx={{ display: { xs: 'none', sm: 'flex' } }}>
             <HelpOutline />
          </IconButton>

          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: {
                  variant: 'plain',
                  color: 'neutral',
                  sx: { display: { xs: 'none', md: 'flex' }, p: 0.5, px: 1, borderRadius: 'md' }
                }
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ textAlign: 'right' }}>
                  <Typography level="body-sm" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                  <Typography level="body-xs" color={roleColors[user.role] as any}>
                    {roleLabels[user.role]}
                  </Typography>
                </Box>
                <Avatar
                  size="sm"
                  variant="soft"
                  color={roleColors[user.role] as any}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </Stack>
            </MenuButton>
            <Menu placement="bottom-end" sx={{ minWidth: 200 }}>
              <MenuItem onClick={() => handleNavigate('/profile')}>
                <Person /> Profile
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/settings')}>
                <Settings /> Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} color="danger">
                <LogoutIcon /> Logout
              </MenuItem>
            </Menu>
          </Dropdown>

          {/* Mobile Menu Toggle */}
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Stack>
      </Box>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <Box sx={{ display: { xs: 'block', md: 'none' }, p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack spacing={1}>
            {getNavItems().map((item) => (
              <Button
                key={item.path}
                variant="plain"
                color="neutral"
                startDecorator={item.icon}
                onClick={() => handleNavigate(item.path)}
                sx={{ justifyContent: 'flex-start' }}
              >
                {item.label}
              </Button>
            ))}
            <Divider />
            <Button variant="plain" startDecorator={<Person />} onClick={() => handleNavigate('/profile')} sx={{ justifyContent: 'flex-start' }}>Profile</Button>
            <Button variant="plain" color="danger" startDecorator={<LogoutIcon />} onClick={handleLogout} sx={{ justifyContent: 'flex-start' }}>
              Logout
            </Button>
          </Stack>
        </Box>
      )}
    </Sheet>
  );
};

export default Header;