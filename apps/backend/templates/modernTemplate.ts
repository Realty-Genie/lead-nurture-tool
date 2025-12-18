import type { Realtor } from "./RealtorInterface.js";

export const modernTemplateProvider = (subject: string, body: string, realtor: Realtor) => `
<html>
    <head>
        <title>${subject}</title>
        <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .container { max-width: 600px; margin: 20px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white; }
            .content { padding: 40px 30px; }
            .cta-button { display: inline-block; padding: 12px 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
            .stats { display: flex; justify-content: space-around; background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .stat { text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
            .stat-label { font-size: 12px; color: #6c757d; text-transform: uppercase; }
            .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${realtor.brandLogoUrl ? `<img src="${realtor.brandLogoUrl}" alt="Brand Logo" style="max-height: 50px; margin-bottom: 15px;"/>` : ''}
                <h1 style="margin: 0; font-size: 28px; font-weight: 300;">${subject}</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">${realtor.brokerageName ?? ''}</p>
            </div>
            <div class="content">
                <div>${body}</div>
                
                <div class="stats">
                    <div class="stat">
                        <div class="stat-number">${realtor.yearsInBusiness != null ? realtor.yearsInBusiness + '+' : ''}</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">${(realtor.markets ?? []).length}</div>
                        <div class="stat-label">Markets Served</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">${realtor.realtorType ?? ''}</div>
                        <div class="stat-label">Service Type</div>
                    </div>
                </div>
                
                ${realtor.calendlyLink ? `<div style="text-align: center;"><a href="${realtor.calendlyLink}" class="cta-button">Schedule Your Consultation</a></div>` : ''}
            </div>
            <div class="footer">
                <p style="margin: 0; font-weight: 500;">${realtor.professionalEmail ?? ''} | ${realtor.phNo ?? ''}</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #6c757d;">Proudly serving: ${(realtor.markets ?? []).length > 0 ? (realtor.markets ?? []).join(' • ') : ''}</p>
            </div>
        </div>
    </body>
</html>`;
