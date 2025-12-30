@echo off
echo.
echo [SANDO'S ADVISORY: INITIATING DEPLOYMENT]
echo.
git add .
git commit -m "Automated Elite Update %date% %time%"
git push origin main
echo.
echo [DEPLOYMENT COMPLETE - CHECK GITHUB ACTIONS]
pause