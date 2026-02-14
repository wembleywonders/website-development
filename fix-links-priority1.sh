#!/bin/bash
echo "=== Fixing wrong-path links ==="

echo "1. /programs/ → /programmes/"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/programs/|to="/programmes/|g' {} +
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|href="/programs/|href="/programmes/|g' {} +

echo "2. /kaywanas-court → /programmes/kaywanas-court"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/kaywanas-court"|to="/programmes/kaywanas-court"|g' {} +

echo "3. /silk-stilettos → /programmes/silk-stilettos"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/silk-stilettos"|to="/programmes/silk-stilettos"|g' {} +

echo "4. /techreneurs → /programmes/techreneurs"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/techreneurs"|to="/programmes/techreneurs"|g' {} +

echo "5. /passionistas → /programmes/silk-stilettos"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/passionistas"|to="/programmes/silk-stilettos"|g' {} +

echo "6. /casters → /programmes/gtechcasters"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/casters"|to="/programmes/gtechcasters"|g' {} +

echo "7. /policies/safeguarding → /safeguarding"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/policies/safeguarding"|to="/safeguarding"|g' {} +

echo "8. /community-overview → /community/overview"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/community-overview"|to="/community/overview"|g' {} +

echo "9. /community/joystick → /joystick"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/community/joystick"|to="/joystick"|g' {} +

echo "10. /community/rayd-yo → /raydyo"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/community/rayd-yo"|to="/raydyo"|g' {} +

echo "11. /your-journey → /journey"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/your-journey"|to="/journey"|g' {} +

echo "12. /partner-with-us → /partnerships"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/partner-with-us"|to="/partnerships"|g' {} +

echo "13. /partner → /partnerships"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/partner"|to="/partnerships"|g' {} +

echo "14. /our-story → /about"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|href="/our-story"|href="/about"|g' {} +

echo "15. /get-involved → /volunteers"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|href="/get-involved"|href="/volunteers"|g' {} +

echo "16. /volunteer → /volunteers"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|href="/volunteer"|href="/volunteers"|g' {} +

echo "17. /factory → /creator-factory"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/factory"|to="/creator-factory"|g' {} +

echo "18. /journal → /creators-journal"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/journal"|to="/creators-journal"|g' {} +

echo "19. /support → /contact"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|href="/support"|href="/contact"|g' {} +

echo "20. /tools → /workshops/spark-generator"
find src/ -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|to="/tools"|to="/workshops/spark-generator"|g' {} +

echo ""
echo "=== DONE. Verify nothing remains: ==="
echo "Checking for leftover broken links..."
grep -rn 'to="/programs/' src/ --include='*.tsx' && echo "^^^ STILL FOUND" || echo "✓ /programs/ clean"
grep -rn 'to="/kaywanas-court"' src/ --include='*.tsx' && echo "^^^ STILL FOUND" || echo "✓ /kaywanas-court clean"
grep -rn 'to="/silk-stilettos"' src/ --include='*.tsx' && echo "^^^ STILL FOUND" || echo "✓ /silk-stilettos clean"
grep -rn 'to="/passionistas"' src/ --include='*.tsx' && echo "^^^ STILL FOUND" || echo "✓ /passionistas clean"
grep -rn 'to="/casters"' src/ --include='*.tsx' && echo "^^^ STILL FOUND" || echo "✓ /casters clean"
