$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'
$logoPath = Join-Path $publicDir 'marine-logo.png'
$backgroundPath = Join-Path $publicDir 'boat-background.png'
$outputPath = Join-Path $publicDir 'signature-card.png'

$width = 700
$height = 372

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

  $bottomOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(210, 15, 23, 42))
  $graphics.FillRectangle($bottomOverlay, 0, 242, $width, 130)
  $bottomOverlay.Dispose()

  $leftPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(105, 15, 23, 42))
  $graphics.FillRectangle($leftPanel, 0, 102, 438, 140)
  $leftPanel.Dispose()

  $rightPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(118, 15, 23, 42))
  $graphics.FillRectangle($rightPanel, 444, 28, 236, 214)
  $rightPanel.Dispose()

  $gold = [System.Drawing.Color]::FromArgb(234, 179, 8)
  $white = [System.Drawing.Color]::White
  $slate = [System.Drawing.Color]::FromArgb(207, 217, 230)

  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $slateBrush = New-Object System.Drawing.SolidBrush($slate)
  $linePen = New-Object System.Drawing.Pen($gold, 2)
  $dividerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 148, 163, 184), 1)

  $nameFont = New-Object System.Drawing.Font('Arial', 17.5, [System.Drawing.FontStyle]::Bold)
  $roleFont = New-Object System.Drawing.Font('Arial', 11.8, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Arial', 9.8, [System.Drawing.FontStyle]::Bold)
  $metaFont = New-Object System.Drawing.Font('Arial', 8.2)
  $contactLabelFont = New-Object System.Drawing.Font('Arial', 8.8, [System.Drawing.FontStyle]::Bold)
  $contactFont = New-Object System.Drawing.Font('Arial', 8.8)
  $companyFont = New-Object System.Drawing.Font('Arial', 7.4, [System.Drawing.FontStyle]::Bold)
  $companySmallFont = New-Object System.Drawing.Font('Arial', 6.5, [System.Drawing.FontStyle]::Bold)
  $disclaimerFont = New-Object System.Drawing.Font('Arial', 6.3)

  $graphics.DrawImage($logo, (New-Object System.Drawing.Rectangle 22, 38, 186, 67))
  $graphics.DrawString('MARINE INDEPENDENT', $companyFont, $goldBrush, 115, 57)
  $graphics.DrawString('SURVEYORS LTD', $companySmallFont, $whiteBrush, 115, 71)

  $graphics.DrawString('Conchiano Evenor', $nameFont, $whiteBrush, 260, 37)
  $graphics.DrawString('Surveyor', $roleFont, $goldBrush, 261, 67)

  $bodyRect = New-Object System.Drawing.RectangleF(258, 95, 170, 58)
  $bodyFormat = New-Object System.Drawing.StringFormat
  $graphics.DrawString("For and on behalf of Marine Independent`nSurveyors Ltd, as agents only", $bodyFont, $whiteBrush, $bodyRect, $bodyFormat)

  $graphics.DrawString('Business Reg. No: C22186278', $metaFont, $slateBrush, 260, 158)
  $graphics.DrawString('VAT Reg. No: 28018844', $metaFont, $slateBrush, 260, 176)

  $graphics.DrawLine($linePen, 468, 33, 468, 212)

  $graphics.DrawString('MOBILE', $contactLabelFont, $goldBrush, 494, 37)
  $graphics.DrawString('+230 5509 6001', $contactFont, $whiteBrush, 494, 53)
  $graphics.DrawString('EMAIL', $contactLabelFont, $goldBrush, 494, 87)
  $graphics.DrawString('mis@marinesurvey.mu', $contactFont, $whiteBrush, 494, 103)
  $graphics.DrawString('WEBSITE', $contactLabelFont, $goldBrush, 494, 137)
  $graphics.DrawString('www.marinesurvey.mu', $contactFont, $whiteBrush, 494, 153)
  $graphics.DrawString('ADDRESS', $contactLabelFont, $goldBrush, 494, 187)
  $graphics.DrawString("2 Avenue Flamboyant`nResidence Vallijee`n11309 Port Louis", $contactFont, $whiteBrush, 494, 203)

  $graphics.DrawLine($dividerPen, 28, 280, 672, 280)

  $disclaimerRect = New-Object System.Drawing.RectangleF(28, 292, 640, 56)
  $graphics.DrawString(
    "Any views expressed in this email are those of the sender only. The content of this email is confidential and intended solely for the use of the recipient(s). If received in error, it should be removed from the system without being read, copied, distributed or disclosed to anyone.`nEvery care has been taken for this email to reach the recipient(s) free from computer viruses. No liability will be accepted for any loss or damage which may be caused.`nWe process your personal data in accordance with the Data Protection Act 2017, which is itself aligned with the General Data Protection Regulation.",
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
