import * as React from 'react'
import { Button, Chip, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'

const items = [
  {
    icon: <HealthAndSafetyRoundedIcon />,
    title: 'Comprehensive Care',
    description:
      'Access a full range of health services from experienced doctors, ensuring all your medical needs are met.',
    imageLight:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care8.png?raw=true")',
    imageDark:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care8.png?raw=true")',
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: 'Secure and Private',
    description:
      'Your health information is protected with top-level security, ensuring your privacy at all times.',
    imageLight:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care9.png?raw=true")',
    imageDark:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care9.png?raw=true")',
  },
  {
    icon: <InsightsRoundedIcon />,
    title: 'Actionable Insights',
    description:
      'Receive detailed analytics and insights on your health, helping you make informed decisions.',
    imageLight:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care7.png?raw=true")',
    imageDark:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care7.png?raw=true")',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: '24/7 Support',
    description:
      'Our customer support team is available around the clock to assist you with any queries or issues.',
    imageLight:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care88.png?raw=true")',
    imageDark:
      'url("https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care88.png?raw=true")',
  },
  {
    icon: <EventAvailableRoundedIcon />,
    title: 'Easy Appointments',
    description:
      'Schedule and manage appointments effortlessly with our user-friendly booking system.',
    imageLight: 'url("/static/images/appointments-light.png")',
    imageDark: 'url("/static/images/appointments-dark.png")',
  },
]

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)

  const handleItemClick = (index) => {
    setSelectedItemIndex(index)
  }

  const selectedFeature = items[selectedItemIndex]

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h4" color="text.primary">
            Product Features
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 4 } }}
          >
            Discover the key features of our health chatbot application,
            designed to provide comprehensive care, security, actionable
            insights, and more.
          </Typography>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: 'auto', sm: 'none' } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? selectedItemIndex === index
                        ? 'primary.light'
                        : ''
                      : selectedItemIndex === index
                        ? 'primary.light'
                        : '',
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? selectedItemIndex === index
                        ? 'none'
                        : ''
                      : selectedItemIndex === index
                        ? 'none'
                        : '',
                  backgroundColor:
                    selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{ display: { xs: 'auto', sm: 'none' }, mt: 4 }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? selectedFeature.imageLight
                    : selectedFeature.imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200'
                      : selectedItemIndex === index
                        ? 'primary.dark'
                        : 'grey.800',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300'
                          : selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.700',
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? selectedFeature.imageLight
                    : selectedFeature.imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
