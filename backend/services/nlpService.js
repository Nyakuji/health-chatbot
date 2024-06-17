const process = require('process')
const openai = require('openai').default
require('dotenv').config()

const { apiKey } = process.env

const openaiInstance = new openai({
  apiKey: apiKey,
})

const queryNLPService = async (query) => {
  let attempt = 0 // Declare and initialize the attempt variable
  try {
    const response = await openaiInstance.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `The user has the following symptoms: ${query}. Provide a possible medical condition and advice.`,
        },
      ],
      max_tokens: 150,
    })

    const result = response.choices[0].text.trim()
    // cache.set(query, result); // Cache the response - Commented out as cache is not defined
    return result
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded, retrying...', error)
      attempt++
      await new Promise((res) => setTimeout(res, attempt * 1000)) // Exponential backoff
    } else {
      console.error('Error querying OpenAI:', error)
      throw new Error('Failed to get response from OpenAI')
    }
  }

  throw new Error('Exceeded maximum retries for querying OpenAI')
}

module.exports = { queryNLPService }
