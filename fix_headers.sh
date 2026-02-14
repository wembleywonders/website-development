#!/bin/bash

# List of files to fix
files=(
"src/pages/AboutUsPage.tsx"
"src/pages/ApplicationDashboard.tsx" 
"src/pages/ApplicationSuccessPage.tsx"
"src/pages/ApplyPage.tsx"
"src/pages/AssessmentGuidePage.tsx"
"src/pages/ChampionPage.tsx"
"src/pages/CommunityCalendarPage.tsx"
"src/pages/CommunityOverviewPage.tsx"
"src/pages/CommunityShopPage.tsx"
"src/pages/ConnectorApplicationForm.tsx"
"src/pages/ConnectorHandbookPage.tsx"
"src/pages/ConnectorPage.tsx"
"src/pages/CuratorPage.tsx"
"src/pages/GetStartedPage.tsx"
"src/pages/JoystickPage.tsx"
"src/pages/MembershipPage.tsx"
"src/pages/PracticeAssessmentPage.tsx"
"src/pages/PrivacyPolicyPage.tsx"
"src/pages/RaydyoPage.tsx"
"src/pages/SafeguardingPolicyPage.tsx"
"src/pages/SampleScenariosPage.tsx"
"src/pages/ScheduleAssessmentPage.tsx"
"src/pages/SuccessStoriesPage.tsx"
"src/pages/TermsOfServicePage.tsx"
"src/pages/change/index.tsx"
"src/pages/community-hubs/index.tsx"
"src/pages/compete/index.tsx"
"src/pages/connect/index.tsx"
"src/pages/create/index.tsx"
"src/pages/cultivate/index.tsx"
"src/pages/family-support/index.tsx"
"src/pages/get-involved/index.tsx"
"src/pages/heritage/index.tsx"
"src/pages/maya/index.tsx"
"src/pages/mutual-aid/index.tsx"
"src/pages/our-story/index.tsx"
"src/pages/resource-coordination/index.tsx"
"src/pages/start-journey/index.tsx"
"src/pages/workshops/index.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing $file..."
        # Remove Header import line
        sed -i "/import Header from/d" "$file"
        # Remove <Header /> JSX (with optional whitespace)
        sed -i "/<Header[[:space:]]*\/>/d" "$file"
    fi
done

echo "Done! All Header imports and JSX removed."
