# Contact submissions → Google Sheets

The website posts contact messages to `/api/contact`. That server endpoint forwards messages to a Google Apps Script web app, keeping the Google endpoint out of the browser bundle.

1. Create a Google Sheet and add this header row:

   `Submitted at | First name | Last name | Email | Subject | Message`

2. In the Sheet, open **Extensions → Apps Script** and paste the script below. Replace `YOUR_SPREADSHEET_ID` with the ID from the Sheet URL.

   ```js
   const SHEET_ID = 'YOUR_SPREADSHEET_ID';
   const SHEET_NAME = 'Contact Submissions';

   function doPost(event) {
     const data = JSON.parse(event.postData.contents || '{}');
     const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
     sheet.appendRow([
       data.submittedAt || new Date().toISOString(),
       data.firstName || '',
       data.lastName || '',
       data.email || '',
       data.subject || '',
       data.message || '',
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy it as a **Web app**: **Deploy → New deployment → Web app**. Run as yourself and set access to **Anyone**. Copy the `/exec` web-app URL.
4. In Vercel, add `GOOGLE_APPS_SCRIPT_WEB_APP_URL` with that URL for Production, Preview, and Development, then redeploy.

The Vercel endpoint validates fields, limits message length, includes a honeypot to reject basic bots, and returns a visible error instead of showing a false success if the Google endpoint is not configured.
