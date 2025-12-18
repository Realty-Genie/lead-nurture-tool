import type { Realtor } from "./RealtorInterface.js";

export const professionalTemplateProvider = (subject: string, body: string, realtor: Realtor) => `
<html>
    <head>
        <title>${subject}</title>
        <style>
            body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #fff; }
            .container { max-width: 650px; margin: 0 auto; border: 1px solid #ddd; }
            .header { padding: 30px; border-bottom: 3px solid #d4af37; }
            .profile-section { display: flex; align-items: center; margin-bottom: 20px; }
            .profile-image { width: 80px; height: 80px; border-radius: 50%; margin-right: 20px; }
            .content { padding: 30px; line-height: 1.8; }
            .signature-section { margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #d4af37; }
            .footer { background-color: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 11px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="profile-section">
                    ${realtor.profileImageUrl ? `<img src="${realtor.profileImageUrl}" alt="Profile" class="profile-image"/>` : ''}
                    <div>
                        <h1 style="margin: 0; color: #2c3e50;">${realtor.brokerageName ?? ''}</h1>
                        <p style="margin: 5px 0; color: #7f8c8d;">${realtor.realtorType ?? ''} Real Estate Professional</p>
                        <p style="margin: 5px 0; color: #7f8c8d;">${realtor.yearsInBusiness != null ? realtor.yearsInBusiness + ' years of experience' : ''}</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">${subject}</h2>
                <div>${body}</div>
                <div class="signature-section">
                    ${realtor.signatureImageUrl ? `<img src="${realtor.signatureImageUrl}" alt="Signature" style="max-height: 40px;"/><br>` : ''}
                    <p style="margin: 10px 0 0 0;"><strong>Professional Contact Information:</strong><br>
                    📧 ${realtor.professionalEmail ?? ''}<br>
                    📱 ${realtor.phNo ?? ''}<br>
                    ${realtor.calendlyLink ? `🗓️ <a href="${realtor.calendlyLink}" style="color: #d4af37;">Schedule Consultation</a>` : ''}</p>
                </div>
            </div>
            <div class="footer">
                <p>Licensed Real Estate Professional | Specializing in: ${(realtor.markets ?? []).length > 0 ? (realtor.markets ?? []).join(', ') : ''}</p>
                ${realtor.brokerageLogoUrl ? `<img src="${realtor.brokerageLogoUrl}" alt="Brokerage Logo" style="max-height: 25px; margin-top: 10px;"/>` : ''}
            </div>
        </div>
    </body>
</html>`;