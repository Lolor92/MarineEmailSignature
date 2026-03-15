$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root 'public'
$logoPath = Join-Path $publicDir 'marine-logo.png'
$backgroundPath = Join-Path $publicDir 'boat-background.png'
$outputPath = Join-Path $publicDir 'signature-card.png'

$width = 620
$height = 330

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.Color]::FromArgb(15, 23, 42))

$background = [System.Drawing.Image]::FromFile($backgroundPath)
$logo = [System.Drawing.Image]::FromFile($logoPath)

try {
  $graphics.DrawImage($background, (New-Object System.Drawing.Rectangle 0, 0, $width, 135))

  $overlayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(176, 15, 23, 42))
  $graphics.FillRectangle($overlayBrush, 0, 0, $width, $height)
  $overlayBrush.Dispose()

  $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(208, 15, 23, 42))
  $graphics.FillRectangle($panelBrush, 0, 125, $width, 205)
  $panelBrush.Dispose()

  $gold = [System.Drawing.Color]::FromArgb(234, 179, 8)
  $white = [System.Drawing.Color]::White
  $slate = [System.Drawing.Color]::FromArgb(203, 213, 225)

  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $slateBrush = New-Object System.Drawing.SolidBrush($slate)
  $linePen = New-Object System.Drawing.Pen($gold, 3)
  $dividerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 148, 163, 184), 2)

  $nameFont = New-Object System.Drawing.Font('Arial', 20, [System.Drawing.FontStyle]::Bold)
  $roleFont = New-Object System.Drawing.Font('Arial', 12, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Arial', 10.5, [System.Drawing.FontStyle]::Bold)
  $metaFont = New-Object System.Drawing.Font('Arial', 8.8)
  $contactLabelFont = New-Object System.Drawing.Font('Arial', 9.5, [System.Drawing.FontStyle]::Bold)
  $contactFont = New-Object System.Drawing.Font('Arial', 8.8)
  $companyFont = New-Object System.Drawing.Font('Arial', 7.8, [System.Drawing.FontStyle]::Bold)
  $companySmallFont = New-Object System.Drawing.Font('Arial', 6.5, [System.Drawing.FontStyle]::Bold)
  $disclaimerFont = New-Object System.Drawing.Font('Arial', 6.8)

  $graphics.DrawImage($logo, (New-Object System.Drawing.Rectangle 22, 27, 130, 46))
  $graphics.DrawString('MARINE INDEPENDENT', $companyFont, $goldBrush, 89, 48)
  $graphics.DrawString('SURVEYORS LTD', $companySmallFont, $whiteBrush, 89, 58)

  $graphics.DrawString('Conchiano Evenor', $nameFont, $whiteBrush, 228, 28)
  $graphics.DrawString('Surveyor', $roleFont, $goldBrush, 231, 54)

  $bodyRect = New-Object System.Drawing.RectangleF(228, 76, 152, 48)
  $bodyFormat = New-Object System.Drawing.StringFormat
  $graphics.DrawString("For and on behalf of Marine Independent`nSurveyors Ltd, as agents only", $bodyFont, $whiteBrush, $bodyRect, $bodyFormat)

  $graphics.DrawString('Business Reg. No: C22186278', $metaFont, $slateBrush, 231, 125)
  $graphics.DrawString('VAT Reg. No: 28018844', $metaFont, $slateBrush, 231, 139)

  $graphics.DrawLine($linePen, 416, 27, 416, 198)

  $graphics.DrawString('MOBILE', $contactLabelFont, $goldBrush, 435, 29)
  $graphics.DrawString('+230 5509 6001', $contactFont, $whiteBrush, 435, 44)
  $graphics.DrawString('EMAIL', $contactLabelFont, $goldBrush, 435, 77)
  $graphics.DrawString('mis@marinesurvey.mu', $contactFont, $whiteBrush, 435, 92)
  $graphics.DrawString('WEBSITE', $contactLabelFont, $goldBrush, 435, 125)
  $graphics.DrawString('www.marinesurvey.mu', $contactFont, $whiteBrush, 435, 140)
  $graphics.DrawString('ADDRESS', $contactLabelFont, $goldBrush, 435, 173)
  $graphics.DrawString("2 Avenue Flamboyant`nResidence Vallijee`n11309 Port Louis", $contactFont, $whiteBrush, 435, 188)
  $graphics.DrawString('LINKEDIN', $contactLabelFont, $goldBrush, 435, 245)
  $graphics.DrawString('Marine Independent Surveyor', $contactFont, $whiteBrush, 435, 260)

  $graphics.DrawLine($dividerPen, 23, 250, 596, 250)

  $disclaimerRect = New-Object System.Drawing.RectangleF(23, 260, 573, 52)
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
