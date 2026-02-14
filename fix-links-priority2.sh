
#!/bin/bash
# ============================================
# PRIORITY 2: Fix remaining broken links
# Run from: ~/projects/wembley-wonders/wembley-clean-rebuild
# ============================================
# 
# PART A: Links that can be redirected to existing pages
# PART B: Links that need manual removal (listed at end)
# ============================================

echo "=== PART A: Redirecting fixable links ==="

# --- Footer.tsx fixes ---
echo "1. Footer: /accessibility → /about (add accessibility section later)"
find src/ -type f -name "Footer.tsx" -exec sed -i 's|"/accessibility"|"/about"|g' {} +

echo "2. Footer: /backstage-skills → /programmes"
find src/ -type f -name "Footer.tsx" -exec sed -i 's|"/backstage-skills"|"/programmes"|g' {} +

echo "3. Footer: /complaints → /contact"
find src/ -type f -name "Footer.tsx" -exec sed -i 's|"/complaints"|"/contact"|g' {} +

echo "4. Footer: /cookies → /privacy"
find src/ -type f -name "Footer.tsx" -exec sed -i 's|"/cookies"|"/privacy"|g' {} +

echo "5. Footer: /programmes/connoisseurs-club → /connoisseurs-club"
find src/ -type f -name "Footer.tsx" -exec sed -i 's|"/programmes/connoisseurs-club"|"/connoisseurs-club"|g' {} +

# --- PageTemplate.tsx fixes ---
echo "6. PageTemplate: /change → /about"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/change"|"/about"|g' {} +

echo "7. PageTemplate: /community-hubs → /community"
find src/ -type f \( -name "PageTemplate.tsx" -o -name "App.tsx" \) -exec sed -i 's|"/community-hubs"|"/community"|g' {} +

echo "8. PageTemplate: /compete → /sessions"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/compete"|"/sessions"|g' {} +

echo "9. PageTemplate: /connect → /community"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/connect"|"/community"|g' {} +

echo "10. PageTemplate: /cultivate → /programmes"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/cultivate"|"/programmes"|g' {} +

echo "11. PageTemplate: /family-support → /contact"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/family-support"|"/contact"|g' {} +

echo "12. PageTemplate: /mutual-aid → /community"
find src/ -type f -name "PageTemplate.tsx" -exec sed -i 's|"/mutual-aid"|"/community"|g' {} +

echo "13. PageTemplate: /members-bonus → /membership"
find src/ -type f \( -name "PageTemplate.tsx" -o -name "App.tsx" -o -name "CommunityInvestmentPage.tsx" \) -exec sed -i 's|"/members-bonus"|"/membership"|g' {} +

# --- Header.tsx fixes ---
echo "14. Header: /settings → /dashboard"
find src/ -type f -name "Header.tsx" -exec sed -i 's|"/settings"|"/dashboard"|g' {} +

echo "15. Header: /workspace → /dashboard"
find src/ -type f -name "Header.tsx" -exec sed -i 's|"/workspace"|"/dashboard"|g' {} +

# --- QuarterlyWorkshopsGrid.tsx fixes ---
echo "16. QuarterlyWorkshopsGrid: /creative-media → /programmes/gtechcasters"
find src/ -type f -name "QuarterlyWorkshopsGrid.tsx" -exec sed -i 's|"/creative-media"|"/programmes/gtechcasters"|g' {} +

echo "17. QuarterlyWorkshopsGrid: /digital-basics → /programmes/bright-sparks"
find src/ -type f -name "QuarterlyWorkshopsGrid.tsx" -exec sed -i 's|"/digital-basics"|"/programmes/bright-sparks"|g' {} +

echo "18. QuarterlyWorkshopsGrid: /heritage-community → /connoisseurs-club"
find src/ -type f -name "QuarterlyWorkshopsGrid.tsx" -exec sed -i 's|"/heritage-community"|"/connoisseurs-club"|g' {} +

echo "19. QuarterlyWorkshopsGrid: /stem-fundamentals → /programmes/stemgeneers"
find src/ -type f -name "QuarterlyWorkshopsGrid.tsx" -exec sed -i 's|"/stem-fundamentals"|"/programmes/stemgeneers"|g' {} +

# --- Individual page fixes ---
echo "20. MembershipPage: /activities → /programmes"
find src/ -type f -name "MembershipPage.tsx" -exec sed -i 's|"/activities"|"/programmes"|g' {} +

echo "21. CompeteSection: /competitions → /sessions"
find src/ -type f -name "CompeteSection.tsx" -exec sed -i 's|"/competitions"|"/sessions"|g' {} +

echo "22. /oral-history → /raydyo"
find src/ -type f \( -name "CommunityArchivistPage.tsx" -o -name "RaydyoPage.tsx" \) -exec sed -i 's|"/oral-history"|"/raydyo"|g' {} +

echo "23. /earn/community-archivist → /raydyo"
find src/ -type f \( -name "OralHistoryPage.tsx" -o -name "RaydyoPage.tsx" \) -exec sed -i 's|"/earn/community-archivist"|"/raydyo"|g' {} +

echo "24. /productions → /programmes"
find src/ -type f \( -name "App.tsx" -o -name "AboutUsPage.tsx" \) -exec sed -i 's|"/productions"|"/programmes"|g' {} +

echo "25. /transparency → /about"
find src/ -type f -name "AboutUsPage.tsx" -exec sed -i 's|"/transparency"|"/about"|g' {} +

echo "26. /mentorship → /volunteers"
find src/ -type f -name "SampleScenariosPage.tsx" -exec sed -i 's|"/mentorship"|"/volunteers"|g' {} +

echo "27. /skills → /programmes"
find src/ -type f \( -name "App.tsx" -o -name "CalendarPage.tsx" \) -exec sed -i 's|"/skills"|"/programmes"|g' {} +

echo "28. /profile/skills → /dashboard"
find src/ -type f -name "CalendarPage.tsx" -exec sed -i 's|"/profile/skills"|"/dashboard"|g' {} +

echo "29. /progress → /dashboard"
find src/ -type f \( -name "App.tsx" -o -name "MembershipTierCard.tsx" -o -name "MembershipPage.tsx" \) -exec sed -i 's|"/progress"|"/dashboard"|g' {} +

echo "30. /raydyo/submit → /raydyo"
find src/ -type f -name "ConnectSection.tsx" -exec sed -i 's|"/raydyo/submit"|"/raydyo"|g' {} +

echo "31. /sandbox/mini → /sandbox"
find src/ -type f -name "MiniSandboxBase.tsx" -exec sed -i 's|"/sandbox/mini"|"/sandbox"|g' {} +

echo "32. /finance → /membership"
find src/ -type f \( -name "App.tsx" -o -name "MeetMayaPage.tsx" \) -exec sed -i 's|"/finance"|"/membership"|g' {} +

echo "33. /business/signup → /partnerships"
find src/ -type f \( -name "App.tsx" -o -name "BusinessPartnershipInfo.tsx" \) -exec sed -i 's|"/business/signup"|"/partnerships"|g' {} +

echo "34. /gallery/upload → /programmes"
find src/ -type f -name "index.tsx" -path "*/gallery/*" -exec sed -i 's|"/gallery/upload"|"/programmes"|g' {} +

echo "35. /story-guidelines → /success-stories"
find src/ -type f -name "SuccessStoriesPage.tsx" -exec sed -i 's|"/story-guidelines"|"/success-stories"|g' {} +

echo "36. /submit-story → /success-stories"
find src/ -type f -name "SuccessStoriesPage.tsx" -exec sed -i 's|"/submit-story"|"/success-stories"|g' {} +

echo "37. /studio/mission-deck → /creators-studio"
find src/ -type f -name "CreatorsStudioPage.tsx" -exec sed -i 's|"/studio/mission-deck"|"/creators-studio"|g' {} +

echo "38. /members-bonus/community-ownership → /membership"
find src/ -type f \( -name "App.tsx" -o -name "IndividualBenefits.tsx" \) -exec sed -i 's|"/members-bonus/community-ownership"|"/membership"|g' {} +

echo "39. /members-bonus/individual-benefits → /membership"
find src/ -type f -name "App.tsx" -exec sed -i 's|"/members-bonus/individual-benefits"|"/membership"|g' {} +

# --- Connector/assessment links (these reference a specific flow) ---
echo "40. /connector-application → /apply"
find src/ -type f \( -name "App.tsx" -o -name "MembershipPage.tsx" -o -name "MembershipRoutes.tsx" \) -exec sed -i 's|"/connector-application"|"/apply"|g' {} +

echo "41. /connector-handbook → /membership"
find src/ -type f \( -name "App.tsx" -o -name "ConnectorApplicationGatewayPage.tsx" -o -name "ApplicationDashboard.tsx" -o -name "MembershipPage.tsx" -o -name "AssessmentGuidePage.tsx" -o -name "MembershipRoutes.tsx" \) -exec sed -i 's|"/connector-handbook"|"/membership"|g' {} +

echo "42. /sample-scenarios → /practice-assessment"
find src/ -type f \( -name "App.tsx" -o -name "ConnectorApplicationGatewayPage.tsx" -o -name "ApplicationDashboard.tsx" -o -name "PracticeAssessmentPage.tsx" -o -name "ScheduleAssessmentPage.tsx" -o -name "AssessmentGuidePage.tsx" -o -name "MembershipRoutes.tsx" \) -exec sed -i 's|"/sample-scenarios"|"/practice-assessment"|g' {} +

echo "43. /guides/trubble-n-bass → /workshops/facilitation"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|"/guides/trubble-n-bass"|"/workshops/facilitation"|g' {} +

echo ""
echo "=== DONE ==="
echo ""
echo "=== Verify — count remaining broken links ==="

grep -rn 'to="/' src/ --include="*.tsx" --include="*.ts" | grep -oP 'to="[^"]*"' | sed 's/to="//;s/"//;s/?.*//' | sort -u > /tmp/links-p2.txt
grep -rn 'href="/' src/ --include="*.tsx" --include="*.ts" | grep -oP 'href="[^"]*"' | sed 's/href="//;s/"//;s/?.*//' | sed 's/#.*//' | sort -u >> /tmp/links-p2.txt
sort -u /tmp/links-p2.txt -o /tmp/links-p2.txt
grep -oP 'path="[^"]*"' src/router/index.tsx | sed 's/path="//;s/"//' | sort -u > /tmp/routes-p2.txt

BROKEN=$(comm -23 /tmp/links-p2.txt /tmp/routes-p2.txt | wc -l)
echo "Remaining broken links: $BROKEN"

if [ "$BROKEN" -gt 0 ]; then
  echo ""
  echo "Still broken:"
  comm -23 /tmp/links-p2.txt /tmp/routes-p2.txt
fi
