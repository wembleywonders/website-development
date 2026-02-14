export const EMAIL_TEMPLATES = {
  enrollment_confirmation: {
    subject: "You're enrolled - Welcome to {{programName}}!",
    body: `Hi {{firstName}},
    
Thanks for joining our {{programStrand}} workshop.
Date/Time: {{workshopDateTime}}
Access link: {{joinLink}}

We'll send a reminder 24hrs before the session.
Looking forward to learning together!

— The G-Tech Community Team`
  }
};
