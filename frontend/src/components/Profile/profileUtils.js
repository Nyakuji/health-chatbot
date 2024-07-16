import axios from 'axios'

export const fetchProfile = async (
  userData,
  setLoading,
  setProfile,
  API_URL
) => {
  if (!userData?.id) {
    // If userData or userData.id is null, exit early
    setLoading(false)
    return
  }

  try {
    const response = await axios.get(`${API_URL}/profile/${userData.id}`)
    setProfile(response.data.user)
    setLoading(false)
  } catch (error) {
    console.error('Error fetching profile:', error)
    setLoading(false)
  }
}

export const updateProfile = async (formData, API_URL) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, formData)
    return response
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}
