<<<<<<< HEAD
---
title: "Active Directory Cleanup Automation with PowerShell"
date: 2024-03-18T14:00:00Z
description: "Learn how to use PowerShell to automate cleanup of stale user and computer accounts in Active Directory"
menu:
  sidebar:
    name: AD Cleanup Automation
    identifier: ad-cleanup
    weight: 31
tags: ["PowerShell", "Active Directory", "Automation", "Security", "IT Operations"]
categories: ["Identity Management", "Infrastructure Automation"]
---

## Introduction

Stale and unused objects in Active Directory not only clutter your environment but can also create security risks and provisioning errors. Automating cleanup ensures better hygiene and consistent identity lifecycle management. This guide walks through how to use PowerShell to audit and optionally remove inactive AD users and computers.

---

## Core Principles

### 1. Identify Inactive Users and Computers

```powershell
# Users inactive for 90+ days
$inactiveUsers = Get-ADUser -Filter * -Properties LastLogonDate |
    Where-Object { $_.Enabled -eq $true -and $_.LastLogonDate -lt (Get-Date).AddDays(-90) }

# Computers inactive for 90+ days
$inactiveComputers = Get-ADComputer -Filter * -Properties LastLogonDate |
    Where-Object { $_.Enabled -eq $true -and $_.LastLogonDate -lt (Get-Date).AddDays(-90) }
```

> 🔍 Use `-SearchBase` to narrow to a specific OU  
> Example: `-SearchBase "OU=Workstations,DC=corp,DC=domain,DC=com"`

---

### 2. Export for Review Before Deletion

```powershell
$inactiveUsers | Select-Object Name, SamAccountName, LastLogonDate | Export-Csv ".\InactiveUsers.csv" -NoTypeInformation
$inactiveComputers | Select-Object Name, LastLogonDate | Export-Csv ".\InactiveComputers.csv" -NoTypeInformation
```

---

### 3. (Optional) Remove Accounts After Review

```powershell
# Remove users (example - use caution)
#$inactiveUsers | ForEach-Object { Remove-ADUser -Identity $_ -Confirm:$false }

# Disable computers instead of deleting immediately
$inactiveComputers | ForEach-Object { Disable-ADAccount -Identity $_ }
```

> 🛡️ Always disable first, delete only after organizational approval or quarantine window.

---

### 4. Automate via Scheduled Task

Create a `.ps1` script, and use Task Scheduler or your preferred RMM tool to run it monthly with log output.

---

## Summary

Cleaning up stale objects in Active Directory improves security posture, streamlines provisioning, and supports compliance requirements. With PowerShell and a cautious review process, you can automate cleanup safely and efficiently.

---

## Optional Enhancements

- Quarantine OU move instead of delete
- Email report to IT team
- Logging to `.evtx` or `.csv`
- Cross-reference with HR data or asset system
=======
---
title: "Active Directory Cleanup Automation with PowerShell"
date: 2024-03-18T14:00:00Z
description: "Learn how to use PowerShell to automate cleanup of stale user and computer accounts in Active Directory"
menu:
  sidebar:
    name: AD Cleanup Automation
    identifier: ad-cleanup
    weight: 31
tags: ["PowerShell", "Active Directory", "Automation", "Security", "IT Operations"]
categories: ["Identity Management", "Infrastructure Automation"]
---

## Introduction

Stale and unused objects in Active Directory not only clutter your environment but can also create security risks and provisioning errors. Automating cleanup ensures better hygiene and consistent identity lifecycle management. This guide walks through how to use PowerShell to audit and optionally remove inactive AD users and computers.

---

## Core Principles

### 1. Identify Inactive Users and Computers

```powershell
# Users inactive for 90+ days
$inactiveUsers = Get-ADUser -Filter * -Properties LastLogonDate |
    Where-Object { $_.Enabled -eq $true -and $_.LastLogonDate -lt (Get-Date).AddDays(-90) }

# Computers inactive for 90+ days
$inactiveComputers = Get-ADComputer -Filter * -Properties LastLogonDate |
    Where-Object { $_.Enabled -eq $true -and $_.LastLogonDate -lt (Get-Date).AddDays(-90) }
```

> 🔍 Use `-SearchBase` to narrow to a specific OU  
> Example: `-SearchBase "OU=Workstations,DC=corp,DC=domain,DC=com"`

---

### 2. Export for Review Before Deletion

```powershell
$inactiveUsers | Select-Object Name, SamAccountName, LastLogonDate | Export-Csv ".\InactiveUsers.csv" -NoTypeInformation
$inactiveComputers | Select-Object Name, LastLogonDate | Export-Csv ".\InactiveComputers.csv" -NoTypeInformation
```

---

### 3. (Optional) Remove Accounts After Review

```powershell
# Remove users (example - use caution)
#$inactiveUsers | ForEach-Object { Remove-ADUser -Identity $_ -Confirm:$false }

# Disable computers instead of deleting immediately
$inactiveComputers | ForEach-Object { Disable-ADAccount -Identity $_ }
```

> 🛡️ Always disable first, delete only after organizational approval or quarantine window.

---

### 4. Automate via Scheduled Task

Create a `.ps1` script, and use Task Scheduler or your preferred RMM tool to run it monthly with log output.

---

## Summary

Cleaning up stale objects in Active Directory improves security posture, streamlines provisioning, and supports compliance requirements. With PowerShell and a cautious review process, you can automate cleanup safely and efficiently.

---

## Optional Enhancements

- Quarantine OU move instead of delete
- Email report to IT team
- Logging to `.evtx` or `.csv`
- Cross-reference with HR data or asset system
>>>>>>> main
