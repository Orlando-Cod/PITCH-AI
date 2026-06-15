# Hook: confirm-push-main.ps1
# Intercepts "git push" targeting main and blocks until the user confirms.
# Protocol: exits 2 (block) on first intercept; exits 0 (allow) when
# .claude/.push-confirmed flag exists (Claude creates it after user says "si").

$ErrorActionPreference = "SilentlyContinue"

# Read hook input from stdin
$stdinContent = [System.Console]::In.ReadToEnd()
if (-not $stdinContent) { exit 0 }

try {
    $hookInput = $stdinContent | ConvertFrom-Json
} catch {
    exit 0
}

$command = $hookInput.tool_input.command
if (-not $command) { exit 0 }

# --- Decide if this push targets main ------------------------------------------
$pushesToMain = $false

if ($command -match "git\s+push") {
    if ($command -match "\bmain\b") {
        $pushesToMain = $true
    } else {
        # Bare "git push" -- check current branch
        $currentBranch = git branch --show-current 2>$null
        if ($currentBranch -eq "main") {
            $pushesToMain = $true
        }
    }
}

if (-not $pushesToMain) { exit 0 }

# --- Check for confirmation flag (Claude creates this after user says "si") ----
$flagFile = ".claude\.push-confirmed"
if (Test-Path $flagFile) {
    Remove-Item $flagFile -Force
    exit 0
}

# --- Build diff summary --------------------------------------------------------
$branch    = git branch --show-current 2>$null
$remoteRef = git rev-parse --verify "origin/main" 2>$null

if ($LASTEXITCODE -eq 0) {
    $commits = git log origin/main..HEAD --oneline 2>$null
    $stats   = git diff --stat origin/main..HEAD 2>$null
} else {
    $commits = git log --oneline -15 2>$null
    $stats   = "(primera vez que se sube main - sin base de comparacion remota)"
}

$commitLines = @($commits | Where-Object { $_ -ne "" })
$commitCount = $commitLines.Count

# --- Output feedback for Claude -----------------------------------------------
$separator = "=" * 52

$feedback = @"
PUSH A MAIN BLOQUEADO - SE REQUIERE TU CONFIRMACION
$separator

  Rama: $branch  ->  main
  Commits nuevos: $commitCount

COMMITS QUE SE SUBIRIAN A PRODUCCION:
$($commitLines -join "`n")

ARCHIVOS MODIFICADOS:
$($stats -join "`n")

$separator
Para CONFIRMAR: di "si" -- creare .claude/.push-confirmed
y reintentare el push automaticamente.
Para CANCELAR: di "no" -- el push queda cancelado.
"@

Write-Output $feedback
exit 2
