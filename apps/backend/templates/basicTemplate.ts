import type { Realtor } from "./RealtorInterface.js";

export const basicTemplateProvider = (
  subject: string,
  body: string,
  realtor: Realtor
) => `
<html>
    <head>
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .content { max-width: 600px; margin: 0 auto; padding: 20px; }
        </style>
    </head>
    <body>
        <div class="content">
            <h2>${subject}</h2>
            <div>${body}</div>
            <br>
            <p>Best regards,<br>
            ${realtor.professionalEmail ?? ""}<br>
            ${realtor.phNo ?? ""}</p>
        </div>
    </body>
</html>`;