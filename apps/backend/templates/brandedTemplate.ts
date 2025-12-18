import type { Realtor } from "./RealtorInterface.js";

export const brandedTemplateProvider = (
  subject: string,
  body: string,
  realtor: Realtor
) => `
<html>
    <head>
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background-color: #2c3e50; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .footer { background-color: #34495e; padding: 20px; text-align: center; color: white; font-size: 12px; }
            .logo { max-height: 60px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${
                  realtor.brandLogoUrl
                    ? `<img src="${realtor.brandLogoUrl}" alt="Brand Logo" class="logo"/>`
                    : `<h1 style="color: white; margin: 0;">${
                        realtor.brokerageName ?? ""
                      }</h1>`
                }
            </div>
            <div class="content">
                <h2>${subject}</h2>
                <div>${body}</div>
            </div>
            <div class="footer">
                <p><strong>${realtor.brokerageName ?? ""}</strong></p>
                <p>Email: ${realtor.professionalEmail ?? ""} | Phone: ${
  realtor.phNo ?? ""
}</p>
                ${
                  realtor.calendlyLink
                    ? `<p><a href="${realtor.calendlyLink}" style="color: #3498db;">Schedule a Meeting</a></p>`
                    : ""
                }
                <p>Serving: ${
                  (realtor.markets ?? []).length > 0
                    ? (realtor.markets ?? []).join(", ")
                    : ""
                }</p>
                <p>© ${new Date().getFullYear()} ${
  realtor.brokerageName ?? ""
}. All rights reserved.</p>
            </div>
        </div>
    </body>
</html>`;