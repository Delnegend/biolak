import { TextFieldSingleValidation } from 'payload'

export const validateVideoLink: TextFieldSingleValidation = async (value) => {
	const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/
	if (!value || !youtubeRegex.test(value)) {
		return 'Invalid YouTube URL. Please provide a valid link in the format https://www.youtube.com/watch?v=xxxxxxxxxxx or https://youtu.be/xxxxxxxxxxx.'
	}
	return true
}
