@echo off
echo.
echo [SANDO'S ADVISORY: INITIATING DEPLOYMENT]
echo.
git add .
git commit -m "Update: LinkedIn Vetting System %date% %time%"
git push origin main
echo.
echo [DEPLOYMENT COMPLETE - CHECK GITHUB ACTIONS]
pause