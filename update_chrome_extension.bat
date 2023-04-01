@echo off
cd "C:\Users\wwwgo\Desktop"
rmdir /s /q "C:\Users\wwwgo\Desktop\gt_sales\chrome"
docker cp gt_sales-app-1:/com.docker.devenvironments.code/chrome "C:\Users\wwwgo\Desktop\gt_sales"
"C:\Program Files\Google\Chrome\Application\chrome.exe" "--load-extension=C:\Users\wwwgo\Desktop\gt_sales\chrome"
pause
