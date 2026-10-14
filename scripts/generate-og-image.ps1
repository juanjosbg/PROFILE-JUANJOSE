Add-Type -AssemblyName System.Drawing
$bitmap = New-Object System.Drawing.Bitmap 1200, 630
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::FromArgb(10, 10, 10))
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(242, 242, 242))
$blue = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(85, 164, 246))
$gray = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(170, 170, 170))
$titleFont = New-Object System.Drawing.Font 'Segoe UI', 48, ([System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font 'Segoe UI', 30
$smallFont = New-Object System.Drawing.Font 'Segoe UI', 19
try {
  $graphics.FillRectangle($blue, 70, 80, 70, 6)
  $graphics.DrawString(('Juan Jos' + [char]0x00E9 + ' Borrero'), $titleFont, $white, 65, 155)
  $graphics.DrawString('React + Inteligencia Artificial', $subtitleFont, $blue, 70, 260)
  $graphics.DrawString(('TypeScript {0} Agentes de IA {0} Automatizaci{1}n' -f [char]0x00B7, [char]0x00F3), $smallFont, $gray, 70, 340)
  $graphics.DrawString('Cali, Colombia  /  profile-juanjose.vercel.app', $smallFont, $gray, 70, 505)
  $bitmap.Save((Join-Path $PSScriptRoot '../public/og-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $titleFont.Dispose(); $subtitleFont.Dispose(); $smallFont.Dispose()
  $white.Dispose(); $blue.Dispose(); $gray.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
}
