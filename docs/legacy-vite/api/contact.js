const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  let body = request.body || {}
  try {
    if (typeof body === 'string') body = JSON.parse(body)
  } catch {
    return response.status(400).json({ ok: false, error: 'Invalid form data.' })
  }
  if (clean(body.website, 200)) return response.status(200).json({ ok: true })

  const submission = {
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 254),
    subject: clean(body.subject, 180),
    message: clean(body.message, 5000),
    submittedAt: new Date().toISOString(),
  }

  if (!submission.firstName || !submission.lastName || !emailPattern.test(submission.email) || !submission.subject || !submission.message) {
    return response.status(400).json({ ok: false, error: 'Please complete every required field.' })
  }

  const endpoint = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL
  if (!endpoint) {
    return response.status(503).json({ ok: false, error: 'The contact form is still being configured. Please email flamivor@gmail.com.' })
  }

  try {
    const sheetResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
    if (!sheetResponse.ok) throw new Error(`Google Sheets returned ${sheetResponse.status}`)
    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact submission failed', error)
    return response.status(502).json({ ok: false, error: 'We could not save your message. Please try again or email flamivor@gmail.com.' })
  }
}
