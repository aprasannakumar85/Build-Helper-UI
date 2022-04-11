$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition

Write-Host "Changing to source directory"
Set-Location -Path $scriptPath 

if (Test-Path -Path "$($scriptPath)\node_modules") {
    Write-Host 'node_modules exists'
    #($env:BROWSER = "NONE") -and (npm start)
	npm start
} else {
    Write-Host 'node_modules does not exists'
    npm install    
    #($env:BROWSER = "NONE") -and (npm start)
	npm start
}
