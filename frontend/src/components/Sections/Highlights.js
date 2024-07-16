import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded'

const items = [
  {
    icon: <LocalHospitalRoundedIcon />,
    title: 'Comprehensive Care',
    description:
      'Access a full range of health services from experienced doctors, ensuring all your medical needs are met.',
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: 'Secure and Private',
    description:
      'Your health information is protected with top-level security, ensuring your privacy at all times.',
  },
  {
    icon: <InsightsRoundedIcon />,
    title: 'Actionable Insights',
    description:
      'Receive detailed analytics and insights on your health, helping you make informed decisions.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: '24/7 Support',
    description:
      'Our customer support team is available around the clock to assist you with any queries or issues.',
  },
  {
    icon: <EventAvailableRoundedIcon />,
    title: 'Easy Appointments',
    description:
      'Schedule and manage appointments effortlessly with our user-friendly booking system.',
  },
  {
    icon: <HealthAndSafetyRoundedIcon />,
    title: 'Quality Assurance',
    description:
      'We adhere to the highest standards of healthcare, ensuring you receive the best possible care.',
  },
]

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover the key features of our health chatbot: comprehensive care,
            secure and private interactions, actionable insights, 24/7 support,
            easy appointment management, and quality assurance.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
