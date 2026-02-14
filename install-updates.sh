#!/bin/bash
echo "📥 Installing updated pages..."
echo ""
echo "This will update:"
echo "  - HomePage.tsx & .css"
echo "  - GetStartedPage.tsx & .css"  
echo "  - SignupPage.tsx"
echo "  - AuthPages.css"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo "⚠️  You need to manually copy the updated files from Claude's outputs"
echo ""
echo "Files needed:"
echo "  1. HomePage-UPDATED.tsx → src/pages/HomePage.tsx"
echo "  2. HomePage-UPDATED.css → src/pages/HomePage.css"
echo "  3. GetStartedPage-UPDATED.tsx → src/pages/GetStartedPage.tsx"
echo "  4. GetStartedPage-UPDATED.css → src/pages/GetStartedPage.css"
echo "  5. SignupPage-UPDATED.tsx → src/pages/auth/SignupPage.tsx"
echo "  6. AuthPages-FINAL.css → src/pages/auth/AuthPages.css"
echo ""
echo "Create .env file with:"
echo "  VITE_API_URL=http://localhost:3000"
echo "  VITE_WORKSPACE_URL=http://localhost:5174"
