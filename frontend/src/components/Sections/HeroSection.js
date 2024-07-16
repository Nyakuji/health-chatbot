import React from 'react'
import { alpha, Box, Container, Stack, Typography } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // Import carousel styles
import './HeroSection.module.css'

const photos = [
  {
    src: 'https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care1.png?raw=true',
    alt: 'Comprehensive health monitoring and advice',
  },
  {
    src: 'https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care2.png?raw=true',
    alt: '24/7 access to healthcare professionals',
  },
  {
    src: 'https://github.com/Nyakuji/health-chatbot/blob/main/frontend/src/assets/care3.png?raw=true',
    alt: 'User-friendly interface for easy navigation',
  },
]

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Welcome to&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'primary.main'
                    : 'primary.light',
              }}
            >
              Health Chatbot
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Your personal health assistant, providing comprehensive care and
            support anytime, anywhere. Explore our features and see how we can
            make healthcare more accessible and efficient for you.
          </Typography>
        </Stack>
        <Box
          id="carousel"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            maxWidth: '800px',
            borderRadius: '10px',
            overflow: 'hidden',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        >
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
          >
            {photos.map((photo, index) => (
              <div key={index}>
                <img src={photo.src} alt={photo.alt} />
                <p className="legend">{photo.alt}</p>
              </div>
            ))}
          </Carousel>
        </Box>
      </Container>
    </Box>
  )
}
