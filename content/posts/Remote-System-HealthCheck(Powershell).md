---
title: "Remote System Health Checks with PowerShell"
date: 2024-03-10T09:15:00Z
draft: false
description: "Learn how to automate system diagnostics across remote machines using PowerShell, complete with logging and test strategies"
menu:
  sidebar:
    name: "Remote System Health Checks with PowerShell"
    identifier: system-health-checks
    weight: 30
tags: ["PowerShell", "Automation", "Scripting", "Monitoring", "Infrastructure"]
categories: ["IT Automation", "Infrastructure Management"]
hero: "/images/hero/system-monitoring.jpg"
---

## Introduction

Ensuring system uptime and catching performance issues early is vital in any infrastructure. With PowerShell, you can automate system health checks across your environment, collect metrics, and act on anomalies before they impact operations.

This guide walks through a practical PowerShell script for remote system health monitoring, complete with optional test coverage using Pester.

---

## Core Principles

### 1. Test System Health Remotely with WMI

```powershell
function Test-SystemHealth {
    param (
        [string]$ComputerName
    )

    $result = @{
        ComputerName = $ComputerName
        Ping         = $false
        CPU          = $null
        Memory       = $null
        DiskSpace    = $null
    }

    if (Test-Connection -ComputerName $ComputerName -Count 2 -Quiet) {
        $result.Ping = $true

        try {
            $sys = Get-WmiObject -Class Win32_OperatingSystem -ComputerName $ComputerName
            $cpu = Get-WmiObject -Class Win32_Processor -ComputerName $ComputerName
            $disk = Get-WmiObject -Class Win32_LogicalDisk -ComputerName $ComputerName -Filter "DriveType=3"

            $result.CPU = [math]::Round($cpu.LoadPercentage, 2)
            $result.Memory = [math]::Round((($sys.TotalVisibleMemorySize - $sys.FreePhysicalMemory) / $sys.TotalVisibleMemorySize) * 100, 2)

            $result.DiskSpace = @()
            foreach ($d in $disk) {
                $usedPercent = [math]::Round((($d.Size - $d.FreeSpace) / $d.Size) * 100, 2)
                $result.DiskSpace += @{ Drive = $d.DeviceID; UsedPercent = $usedPercent }
            }
        } catch {
            Write-Warning "Unable to gather metrics from $ComputerName"
        }
    }

    return $result
}

# Example usage
$computers = Get-Content -Path ".\computers.txt"
$healthReport = $computers | ForEach-Object { Test-SystemHealth -ComputerName $_ }

$healthReport | ConvertTo-Json | Out-File ".\HealthReport.json"



### 2. Testing Strategy with Pester
```powershell
Describe 'Test-SystemHealth' {
    It 'Should return a result object with expected keys' {
        $mockResult = Test-SystemHealth -ComputerName "localhost"
        $mockResult | Should -Not -BeNullOrEmpty
        $mockResult | Should -HaveProperty 'ComputerName'
        $mockResult | Should -HaveProperty 'Ping'
        $mockResult | Should -HaveProperty 'CPU'
        $mockResult | Should -HaveProperty 'Memory'
        $mockResult | Should -HaveProperty 'DiskSpace'
    }

    It 'Should show Ping as true for localhost' {
        $mockResult = Test-SystemHealth -ComputerName "localhost"
        $mockResult.Ping | Should -BeTrue
    }
}
