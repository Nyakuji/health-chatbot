import React, { useState } from 'react'
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './FAQSection.module.css'

const faqs = [
  {
    question: 'What is Health Chatbot?',
    answer:
      'Health Chatbot is a comprehensive platform designed to help you manage your health by booking appointments, checking symptoms, and more.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book an appointment by navigating to the "Book Appointment" section, selecting your doctor, and choosing a suitable time slot.',
  },
  {
    question: 'Can I check my symptoms using Health Chatbot?',
    answer:
      'Yes, Health Chatbot offers a symptom checker feature where you can enter your symptoms and get preliminary advice.',
  },
  {
    question: 'How do I update my profile?',
    answer:
      'You can update your profile by navigating to the "Profile" section and editing your details.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We prioritize your privacy and data security by using state-of-the-art encryption and secure data storage solutions.',
  },
]

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container>
        <Typography variant="h4" gutterBottom textAlign="center">
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            expanded={String(expanded) === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  )
}

export default FAQSection
