<#PSScriptInfo .VERSION 0.0.1.1#>

#Requires -Version 6.1
using namespace System.IO
using namespace System.Management.Automation
[CmdletBinding()]
Param ()

& {
  $HostColorArgs = @{
    ForegroundColor = 'Black'
    BackgroundColor = 'Green'
    NoNewline = $True
  }
  
  Try {
    Remove-Item ($BinDir = "$PSScriptRoot\bin") -Recurse -ErrorAction Stop
  } Catch [ItemNotFoundException] {
    Write-Host $_.Exception.Message @HostColorArgs
    Write-Host
  } Catch {
    $HostColorArgs.BackgroundColor = 'Red'
    Write-Host $_.Exception.Message @HostColorArgs
    Write-Host
    Return
  }
  New-Item $BinDir -ItemType Directory -ErrorAction SilentlyContinue | Out-Null
  Copy-Item "$PSScriptRoot\rsc" -Destination $BinDir -Recurse
  
  $SrcDir = "$PSScriptRoot\src"
  
  # Set the windows resources file with the resource compiler.
  & "$PSScriptRoot\rc.exe" /nologo /fo $(($ResFile = "$BinDir\cvmd2html.res")) "$PSScriptRoot\resource.rc"
  # Compile the source code with jsc.exe.
  $EnvPath = $Env:Path
  $Env:Path = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\;$Env:Path"
  jsc.exe /nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /win32res:$ResFile /out:$(($ConvertExe = "$BinDir\cvmd2html.exe")) "$SrcDir\AssemblyInfo.js" "$SrcDir\errorLog.js" "$SrcDir\package.js" "$SrcDir\parameters.js" "$PSScriptRoot\index.js" "$SrcDir\setup.js" "$SrcDir\utils.js"
  $Env:Path = $EnvPath
  
  If ($LASTEXITCODE -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }

  Remove-Item $ResFile -Recurse -ErrorAction SilentlyContinue
  Remove-Item "$BinDir\rsc\*.ico" -Recurse -ErrorAction SilentlyContinue
}