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
    [System.Drawing.Brush]$TextBrush,
    [System.Drawing.Font]$TextFont,
    [string]$Value,
    [string]$IconKind,
    [float]$X,
    [float]$Y,
    [float]$TextHeight = 24
  )

  $iconRect = New-Object System.Drawing.RectangleF -ArgumentList ([single]$X), ([single]$Y), ([single]18), ([single]18)
  Draw-Icon -Graphics $Graphics -Kind $IconKind -X $X -Y $Y

  $textRect = New-Object System.Drawing.RectangleF -ArgumentList ([single]($X + 24)), ([single]($Y - 1)), ([single]168), ([single]$TextHeight)
  $Graphics.DrawString($Value, $TextFont, $TextBrush, $textRect)
}

function Draw-Icon {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string]$Kind,
    [float]$X,
    [float]$Y
  )

  $gold = [System.Drawing.Color]::FromArgb(234, 179, 8)
  $green = [System.Drawing.Color]::FromArgb(34, 197, 94)
  $blue = [System.Drawing.Color]::FromArgb(14, 165, 233)
  $white = [System.Drawing.Color]::White

  $goldPen = New-Object System.Drawing.Pen($gold, 1.6)
  $goldBrush = New-Object System.Drawing.SolidBrush($gold)
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $greenBrush = New-Object System.Drawing.SolidBrush($green)
  $blueBrush = New-Object System.Drawing.SolidBrush($blue)

  try {
    switch ($Kind) {
      'whatsapp' {
        $Graphics.FillEllipse($greenBrush, $X + 1, $Y + 1, 14, 14)
        $phoneFont = New-Object System.Drawing.Font('Segoe UI Symbol', 7.5, [System.Drawing.FontStyle]::Bold)
        try {
          $fmt = New-Object System.Drawing.StringFormat
          $fmt.Alignment = [System.Drawing.StringAlignment]::Center
          $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
          $rect = New-Object System.Drawing.RectangleF -ArgumentList ([single]$X), ([single]$Y), ([single]16), ([single]16)
          $Graphics.DrawString('☎', $phoneFont, $whiteBrush, $rect, $fmt)
        } finally {
          $phoneFont.Dispose()
        }
      }
      'email' {
        $Graphics.DrawRectangle($goldPen, $X + 1, $Y + 3, 14, 10)
        $Graphics.DrawLine($goldPen, $X + 1, $Y + 3, $X + 8, $Y + 9)
        $Graphics.DrawLine($goldPen, $X + 15, $Y + 3, $X + 8, $Y + 9)
      }
      'website' {
        $Graphics.DrawEllipse($goldPen, $X + 1, $Y + 1, 14, 14)
        $Graphics.DrawLine($goldPen, $X + 8, $Y + 1, $X + 8, $Y + 15)
        $Graphics.DrawArc($goldPen, $X + 4, $Y + 1, 8, 14, 90, 180)
        $Graphics.DrawArc($goldPen, $X + 4, $Y + 1, 8, 14, 270, 180)
        $Graphics.DrawLine($goldPen, $X + 2, $Y + 8, $X + 14, $Y + 8)
      }
      'address' {
        $Graphics.DrawEllipse($goldPen, $X + 4, $Y + 1, 8, 8)
        $pinPoints = New-Object 'System.Drawing.PointF[]' 3
        $pinPoints[0] = New-Object System.Drawing.PointF -ArgumentList ([single]($X + 8)), ([single]($Y + 16))
        $pinPoints[1] = New-Object System.Drawing.PointF -ArgumentList ([single]($X + 3)), ([single]($Y + 8))
        $pinPoints[2] = New-Object System.Drawing.PointF -ArgumentList ([single]($X + 13)), ([single]($Y + 8))
        $Graphics.FillPolygon($goldBrush, $pinPoints)
      }
      'linkedin' {
        $Graphics.FillRectangle($blueBrush, $X + 1, $Y + 1, 14, 14)
        $liFont = New-Object System.Drawing.Font('Arial', 6.8, [System.Drawing.FontStyle]::Bold)
        try {
          $fmt = New-Object System.Drawing.StringFormat
          $fmt.Alignment = [System.Drawing.StringAlignment]::Center
          $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
          $rect = New-Object System.Drawing.RectangleF -ArgumentList ([single]($X + 1)), ([single]($Y + 1)), ([single]14), ([single]14)
          $Graphics.DrawString('in', $liFont, $whiteBrush, $rect, $fmt)
        } finally {
          $liFont.Dispose()
        }
      }
    }
  }
  finally {
    $goldPen.Dispose()
    $goldBrush.Dispose()
    $whiteBrush.Dispose()
    $greenBrush.Dispose()
    $blueBrush.Dispose()
  }
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

  $contactFont = New-Object System.Drawing.Font('Arial', 9.8)
  $disclaimerFont = New-Object System.Drawing.Font('Arial', 7.1)
  $nameFont = New-Object System.Drawing.Font('Arial', 18.5, [System.Drawing.FontStyle]::Bold)
  $roleFont = New-Object System.Drawing.Font('Arial', 12.2, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font('Arial', 9.8, [System.Drawing.FontStyle]::Bold)
  $metaFont = New-Object System.Drawing.Font('Arial', 8.7)

  $graphics.DrawImage($logo, (New-Object System.Drawing.Rectangle 26, 56, 126, 58))

  $graphics.DrawString('Conchiano Evenor', $nameFont, $whiteBrush, 188, 50)
  $graphics.DrawString('Surveyor', $roleFont, $goldBrush, 190, 82)

  $bodyRect = New-Object System.Drawing.RectangleF(188, 118, 210, 82)
  $bodyFormat = New-Object System.Drawing.StringFormat
  $graphics.DrawString("For and on behalf of Marine Independent`nSurveyors Ltd, as agents only", $bodyFont, $whiteBrush, $bodyRect, $bodyFormat)

  $graphics.DrawString('Business Registration No: C22186278', $metaFont, $slateBrush, 188, 202)
  $graphics.DrawString('VAT Reg No: 28018844', $metaFont, $slateBrush, 188, 220)

  $graphics.DrawLine($linePen, 430, 42, 430, 236)

  Draw-ContactItem -Graphics $graphics -TextBrush $whiteBrush -TextFont $contactFont -IconKind 'whatsapp' -Value '+230 5509 6001' -X 456 -Y 50
  Draw-ContactItem -Graphics $graphics -TextBrush $whiteBrush -TextFont $contactFont -IconKind 'email' -Value 'mis@marinesurvey.mu' -X 486 -Y 92
  Draw-ContactItem -Graphics $graphics -TextBrush $whiteBrush -TextFont $contactFont -IconKind 'website' -Value 'www.marinesurvey.mu' -X 486 -Y 134
  Draw-ContactItem -Graphics $graphics -TextBrush $whiteBrush -TextFont $contactFont -IconKind 'address' -Value "2 Avenue Flamboyant`nResidence Vallijee,`n11309 Port Louis" -X 486 -Y 176 -TextHeight 50
  Draw-ContactItem -Graphics $graphics -TextBrush $whiteBrush -TextFont $contactFont -IconKind 'linkedin' -Value 'Marine Independent Surveyor' -X 486 -Y 246 -TextHeight 28

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
