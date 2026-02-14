export const QUARTERLY_EMAIL_TEMPLATES = {
 workshop_confirmation: {
   subject: "Workshop confirmed - {{workshopTitle}}",
   body: `Hi {{firstName}},

Your place is confirmed for {{workshopTitle}}.
Date: {{workshopDate}}
Time: {{workshopTime}}
Location: {{venue}}

What to bring: {{equipmentList}}
Contact: {{organizerEmail}}

See you there,
G-Tech Community Team`
 },

 workshop_reminder_72h: {
   subject: "Reminder: {{workshopTitle}} this weekend",
   body: `Hi {{firstName}},

{{workshopTitle}} is happening this {{dayOfWeek}}.
When: {{workshopDateTime}}
Where: {{venue}}

Questions? Reply to this email.

G-Tech Community Team`
 },

 workshop_followup: {
   subject: "Thanks for attending {{workshopTitle}}",
   body: `Hi {{firstName}},

Thanks for joining {{workshopTitle}}.
Resources: {{resourcesLink}}
Next workshop: {{nextWorkshopDate}}

Feedback (2 minutes): {{feedbackLink}}

G-Tech Community Team`
 }
};
