import emailjs from '@emailjs/browser'

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

  if (!publicKey || !serviceId || !templateId) {
    throw new Error('EmailJS is not configured. Please add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID to your environment.')
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      name: payload.name,
      email: payload.email,
      message: payload.message,
    },
    publicKey
  )
}
