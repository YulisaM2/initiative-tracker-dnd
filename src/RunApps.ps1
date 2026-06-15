# =============================================
# Launch backend + frontend applications
# =============================================

Write-Host "Starting backend..."
# Starting mongoDB server that listens only to applications running on same machine and storing it in data folder
$BindingDB = Start-Process powershell -ArgumentList "-Command", "Set-Location -Path './server'; mongod --bind_ip=127.0.0.1 --dbpath=data" -PassThru

# Starting server that manages DB
$BackendApp = Start-Process powershell -ArgumentList "-Command", "Set-Location -Path './server'; node ./index.js" -PassThru

# Starting the client for UI interaction
Write-Host "Starting frontend..."
$FrontEndApp = Start-Process powershell -ArgumentList "-Command", "Set-Location -Path './client/initiative-tracker-app/'; npm run dev" -PassThru

Write-Host "Solution launched succesfully!" -ForegroundColor Green
Read-Host "Press ENTER on this window to stop solution."

Write-Host "Stopping applications..." -ForegroundColor Yellow

# To make sure all node/npm related processes are terminated
# Closes windows that popped up at launch
function Remove-ProcessTree ([int]$ParentId) {
    Get-CimInstance Win32_Process -Filter "ParentProcessId = $ParentId" | ForEach-Object {
        Remove-ProcessTree $_.ProcessId
    }
    Stop-Process -Id $ParentId -Force -ErrorAction SilentlyContinue
}

Remove-ProcessTree -ParentId $BindingDB.Id
Remove-ProcessTree -ParentId $BackendApp.Id
Remove-ProcessTree -ParentId $FrontEndApp.Id

Write-Host "Solution stopped succesfully!" -ForegroundColor Green