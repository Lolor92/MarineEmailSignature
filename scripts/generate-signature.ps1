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

function Draw-ContactItem {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Brush]$IconBrush,
    [System.Drawing.Brush]$TextBrush,
    [System.Drawing.Font]$IconFont,
    [System.Drawing.Font]$TextFont,
    [string]$IconText,
    [string]$Value,
    [float]$X,
    [float]$Y
  )

  $circleRect = New-Object System.Drawing.RectangleF -ArgumentList ([single]$X), ([single]($Y + 2)), ([single]18), ([single]18)
  $Graphics.FillEllipse($IconBrush, $circleRect)

  $iconFormat = New-Object System.Drawing.StringFormat
  $iconFormat.Alignment = [System.Drawing.StringAlignment]::Center
  $iconFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
  $Graphics.DrawString($IconText, $IconFont, $TextBrush, $circleRect, $iconFormat)

  $textRect = New-Object System.Drawing.RectangleF -ArgumentList ([single]($X + 26)), ([single]($Y - 1)), ([single]168), ([single]36)
  $Graphics.DrawString($Value, $TextFont, $TextBrush, $textRect)
}

try {
  Draw-CoverImage -Graphics $graphics -Image $background -TargetWidth $width -TargetHeight $height

  $fullOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(172, 9, 18, 34))
  $graphics.FillRectangle($fullOverlay, 0, 0, $width, $height)
  $fullOverlay.Dispose()

  $bottomOverlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(218, 15, 23, 42))
  $graphics.FillRectangle($bottomOverlay, 0, 260, $width, 170)
  $bottomOverlay.Dispose()

  $leftPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(118, 15, 23, 42))
  $graphics.FillRectangle($leftPanel, 0, 96, 470, 164)
  $leftPanel.Dispose()

  $rightPanel = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(132, 15, 23, 42))
  $graphics.FillRectangle($rightPanel, 492, 24, 200, 236)
  $rightPanel.Dispose()

  $gold = [System.Drawing.Color]::FromArgb(234, 179, 8)
  $white = [System.Drawing.Color]::White
  $slate = [System.Drawing.Color]::FromArgb(207, 217, 230)

  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $slateBrush = New-Object System.Drawing.SolidBrush($slate)
  $linePen = New-Object System.Drawing.Pen($gold, 2)
  $dividerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110, 148, 163, 184), 1)

  $contactIconFont = New-Object System.Drawing.Font('Calibri', 8.8, [System.Drawing.FontStyle]::Bold)
  $contactFont = New-Object System.Drawing.Font('Calibri', 10.2)
  $companyFont = New-Object System.Drawing.Font('Calibri', 8.6, [System.Drawing.FontStyle]::Bold)
  $companySmallFont = New-Object System.Drawing.Font('Calibri', 7.6, [System.Drawing.FontStyle]::Bold)
  $disclaimerFont = New-Object System.Drawing.Font('Calibri', 7.6)
  $nameFont = New-Object System.Drawing.Font('Calibri', 21, [System.Drawing.FontStyle]::Bold)
  $roleFont = New-Object System.Drawing.Font('Calibri', 13.2, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Calibri', 10.5, [System.Drawing.FontStyle]::Bold)
  $metaFont = New-Object System.Drawing.Font('Calibri', 9.0)

  $graphics.DrawImage($logo, (New-Object System.Drawing.Rectangle 20, 40, 136, 64))
  $graphics.DrawString('MARINE INDEPENDENT', $companyFont, $goldBrush, 24, 112)
  $graphics.DrawString('SURVEYORS LTD', $companySmallFont, $whiteBrush, 24, 129)

  $graphics.DrawString('Conchiano Evenor', $nameFont, $whiteBrush, 236, 44)
  $graphics.DrawString('Surveyor', $roleFont, $goldBrush, 238, 76)

  $bodyRect = New-Object System.Drawing.RectangleF(236, 112, 205, 74)
  $bodyFormat = New-Object System.Drawing.StringFormat
  $graphics.DrawString("For and on behalf of Marine Independent`nSurveyors Ltd, as agents only", $bodyFont, $whiteBrush, $bodyRect, $bodyFormat)

  $graphics.DrawString('Business Reg. No: C22186278', $metaFont, $slateBrush, 238, 192)
  $graphics.DrawString('VAT Reg. No: 28018844', $metaFont, $slateBrush, 238, 210)

  $graphics.DrawLine($linePen, 470, 36, 470, 244)

  Draw-ContactItem -Graphics $graphics -IconBrush $goldBrush -TextBrush $whiteBrush -IconFont $contactIconFont -TextFont $contactFont -IconText 'P' -Value '+230 5509 6001' -X 492 -Y 42
  Draw-ContactItem -Graphics $graphics -IconBrush $goldBrush -TextBrush $whiteBrush -IconFont $contactIconFont -TextFont $contactFont -IconText 'E' -Value 'mis@marinesurvey.mu' -X 492 -Y 82
  Draw-ContactItem -Graphics $graphics -IconBrush $goldBrush -TextBrush $whiteBrush -IconFont $contactIconFont -TextFont $contactFont -IconText 'W' -Value 'www.marinesurvey.mu' -X 492 -Y 122
  Draw-ContactItem -Graphics $graphics -IconBrush $goldBrush -TextBrush $whiteBrush -IconFont $contactIconFont -TextFont $contactFont -IconText 'A' -Value "2 Avenue Flamboyant`nResidence Vallijee`n11309 Port Louis" -X 492 -Y 162
  Draw-ContactItem -Graphics $graphics -IconBrush $goldBrush -TextBrush $whiteBrush -IconFont $contactIconFont -TextFont $contactFont -IconText 'in' -Value 'Marine Independent Surveyor' -X 492 -Y 228

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
