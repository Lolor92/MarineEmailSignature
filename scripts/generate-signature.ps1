$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'
$logoPath = Join-Path $publicDir 'marine-logo.png'
$backgroundPath = Join-Path $publicDir 'boat-background.png'
$outputPath = Join-Path $publicDir 'signature-card.png'

$width = 720
$height = 430

function Draw-CoverImage {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Image]$Image,
    [int]$TargetWidth,
    [int]$TargetHeight
  )

  $scale = [Math]::Max($TargetWidth / $Image.Width, $TargetHeight / $Image.Height)
  $drawWidth = [int]([Math]::Ceiling($Image.Width * $scale))
  $drawHeight = [int]([Math]::Ceiling($Image.Height * $scale))
  $x = [int](($TargetWidth - $drawWidth) / 2)
  $y = [int](($TargetHeight - $drawHeight) / 2)
  $Graphics.DrawImage($Image, (New-Object System.Drawing.Rectangle $x, $y, $drawWidth, $drawHeight))
}

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(15, 23, 42))

$background = [System.Drawing.Image]::FromFile($backgroundPath)
$logo = [System.Drawing.Image]::FromFile($logoPath)

try {
  Draw-CoverImage -Graphics $graphics -Image $background -TargetWidth $width -TargetHeight $height

  $fullOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(172, 9, 18, 34))
  $graphics.FillRectangle($fullOverlay, 0, 0, $width, $height)
  $fullOverlay.Dispose()

  $bottomOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(218, 15, 23, 42))
  $graphics.FillRectangle($bottomOverlay, 0, 260, $width, 170)
  $bottomOverlay.Dispose()

  $leftPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(112, 15, 23, 42))
  $graphics.FillRectangle($leftPanel, 0, 96, 452, 164)
  $leftPanel.Dispose()

  $rightPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(126, 15, 23, 42))
  $graphics.FillRectangle($rightPanel, 470, 24, 222, 236)
  $rightPanel.Dispose()

  $gold = [System.Drawing.Color]::FromArgb(234, 179, 8)
  $white = [System.Drawing.Color]::White
  $slate = [System.Drawing.Color]::FromArgb(207, 217, 230)

  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $slateBrush = New-Object System.Drawing.SolidBrush($slate)
  $linePen = New-Object System.Drawing.Pen($gold, 2)
  $dividerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 148, 163, 184), 1)

  $nameFont = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
  $roleFont = New-Object System.Drawing.Font('Segoe UI', 13, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Segoe UI', 10.2, [System.Drawing.FontStyle]::Bold)
  $metaFont = New-Object System.Drawing.Font('Segoe UI', 8.6)
  $contactLabelFont = New-Object System.Drawing.Font('Segoe UI', 9.2, [System.Drawing.FontStyle]::Bold)
  $contactFont = New-Object System.Drawing.Font('Segoe UI', 9.2)
  $companyFont = New-Object System.Drawing.Font('Segoe UI', 8.0, [System.Drawing.FontStyle]::Bold)
  $companySmallFont = New-Object System.Drawing.Font('Segoe UI', 7.0, [System.Drawing.FontStyle]::Bold)
  $disclaimerFont = New-Object System.Drawing.Font('Segoe UI', 7.3)

  $graphics.DrawImage($logo, (New-Object System.Drawing.Rectangle 18, 40, 118, 118))
  $graphics.DrawString('MARINE INDEPENDENT', $companyFont, $goldBrush, 118, 70)
  $graphics.DrawString('SURVEYORS LTD', $companySmallFont, $whiteBrush, 118, 87)

  $graphics.DrawString('Conchiano Evenor', $nameFont, $whiteBrush, 250, 38)
  $graphics.DrawString('Surveyor', $roleFont, $goldBrush, 252, 74)

  $bodyRect = New-Object System.Drawing.RectangleF(248, 108, 185, 66)
  $bodyFormat = New-Object System.Drawing.StringFormat
  $graphics.DrawString("For and on behalf of Marine Independent`nSurveyors Ltd, as agents only", $bodyFont, $whiteBrush, $bodyRect, $bodyFormat)

  $graphics.DrawString('Business Reg. No: C22186278', $metaFont, $slateBrush, 252, 184)
  $graphics.DrawString('VAT Reg. No: 28018844', $metaFont, $slateBrush, 252, 202)

  $graphics.DrawLine($linePen, 454, 36, 454, 232)

  $graphics.DrawString('MOBILE', $contactLabelFont, $goldBrush, 482, 40)
  $graphics.DrawString('+230 5509 6001', $contactFont, $whiteBrush, 482, 58)
  $graphics.DrawString('EMAIL', $contactLabelFont, $goldBrush, 482, 96)
  $graphics.DrawString('mis@marinesurvey.mu', $contactFont, $whiteBrush, 482, 114)
  $graphics.DrawString('WEBSITE', $contactLabelFont, $goldBrush, 482, 152)
  $graphics.DrawString('www.marinesurvey.mu', $contactFont, $whiteBrush, 482, 170)
  $graphics.DrawString('ADDRESS', $contactLabelFont, $goldBrush, 482, 208)
  $graphics.DrawString("2 Avenue Flamboyant`nResidence Vallijee`n11309 Port Louis", $contactFont, $whiteBrush, 482, 226)

  $graphics.DrawLine($dividerPen, 28, 308, 690, 308)

  $disclaimerRect = New-Object System.Drawing.RectangleF(28, 322, 662, 78)
  $graphics.DrawString(
    "Any views expressed in this email are those of the sender only. This email is confidential and intended solely for the recipient(s). If received in error, delete it without reading, copying, distributing or disclosing it.`nEvery care has been taken to ensure this email is free from viruses. No liability is accepted for any loss or damage caused.`nWe process personal data in accordance with the Data Protection Act 2017 and the General Data Protection Regulation.",
    $disclaimerFont,
    $slateBrush,
    $disclaimerRect
  )

  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  $background.Dispose()
  $logo.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}
