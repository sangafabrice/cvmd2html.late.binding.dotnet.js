<#PSScriptInfo .VERSION 0.0.1.3#>

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
  $AssemblyInfoJS = "$SrcDir\AssemblyInfo.js"
  $ResFileRc = "$PSScriptRoot\resource.rc"

  # Import the dependency libraries.
  Copy-Item $(C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -command '[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.mshtml").Location') -Destination ($MshtmlDllPath = "$BinDir\Microsoft.mshtml.dll") -Force
  & "$PSScriptRoot\TlbImp.exe" /nologo /silent 'C:\Windows\System32\wbem\wbemdisp.tlb' /out:$(($SWbemDllPath = "$BinDir\Interop.WbemScripting.dll")) /namespace:WbemScripting
  & "$PSScriptRoot\TlbImp.exe" /nologo /silent 'C:\Windows\System32\wshom.ocx'  /out:$(($WshDllPath = "$BinDir\Interop.IWshRuntimeLibrary.dll")) /namespace:IWshRuntimeLibrary

  # Set the windows resources file with the resource compiler.
  & "$PSScriptRoot\rc.exe" /nologo /fo $(($ResFile = "$BinDir\resource.res")) /d CVMD2HTML $ResFileRc
  & "$PSScriptRoot\rc.exe" /nologo /fo $(($RegistryResFile = "$BinDir\registry.res")) $ResFileRc

  # Compile the source code with jsc.
  $EnvPath = $Env:Path
  $Env:Path = "$Env:windir\Microsoft.NET\Framework$(If ([Environment]::Is64BitOperatingSystem) { '64' })\v4.0.30319\;$Env:Path"
  jsc.exe /nologo /target:library /win32res:$RegistryResFile /reference:$SWbemDllPath /out:$(($StdRegProvDll = "$BinDir\StdRegProv.dll")) /define:StdRegProvWim $AssemblyInfoJS "$SrcDir\StdRegProv.js"
  jsc.exe /nologo /target:$($DebugPreference -eq 'Continue' ? 'exe':'winexe') /win32res:$ResFile /reference:$StdRegProvDll /reference:$WshDllPath /reference:$SWbemDllPath /reference:$MshtmlDllPath /out:$(($ConvertExe = "$BinDir\cvmd2html.exe")) $AssemblyInfoJS "$SrcDir\converter.js" "$SrcDir\msgbox.js" "$SrcDir\package.js" "$SrcDir\parameters.js" "$PSScriptRoot\index.js" "$SrcDir\setup.js" "$SrcDir\utils.js"
  $Env:Path = $EnvPath
  
  If ($LASTEXITCODE -eq 0) {
    Write-Host "Output file $ConvertExe written." @HostColorArgs
    (Get-Item $ConvertExe).VersionInfo | Format-List * -Force
  }

  Remove-Item "$BinDir\*.res" -Recurse -ErrorAction SilentlyContinue
  Remove-Item "$BinDir\rsc\*.ico" -Recurse -ErrorAction SilentlyContinue
}