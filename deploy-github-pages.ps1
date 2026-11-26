# 1-Click GitHub Pages Deployer for CITAS 2027 (PowerShell)
Write-Host "Building and deploying CITAS 2027 to GitHub Pages..." -ForegroundColor Cyan
npm.cmd run deploy
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Successfully deployed to GitHub Pages (gh-pages branch)!" -ForegroundColor Green
    Write-Host "Check your GitHub repository Settings -> Pages to view your live URL." -ForegroundColor Yellow
} else {
    Write-Host "`n! Deployment encountered an error. Make sure you have linked your remote git repository (git remote add origin ...)." -ForegroundColor Red
}
