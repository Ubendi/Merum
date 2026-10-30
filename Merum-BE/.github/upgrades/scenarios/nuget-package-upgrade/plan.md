# NuGet Package Upgrade Plan

## Overview

**Target**: Upgrade AutoMapper from 15.0.1 to the latest compatible stable version.
**Scope**: One .NET 9 project in `Merum-BE.sln`.

## Tasks

### 01-upgrade-automapper: Upgrade AutoMapper in Merum-BE

Update the direct `AutoMapper` package reference in `Merum-BE.csproj` from 15.0.1 to 16.2.0. The assessment found one unified compatible version and no source-breaking public API changes in `apidiff/AutoMapper.apidiff.md`; no unrelated package references or source changes should be made unless the build identifies a minimal required compatibility adjustment.

Restore dependencies and build the project, treating warnings as issues to report and resolve where caused by this upgrade. Preserve unrelated work that was stashed before initialization and restore it after validation.

**Done when**: `Merum-BE.csproj` references AutoMapper 16.2.0, restore succeeds, the project builds successfully without upgrade-related warnings or errors, and unrelated working-tree changes are preserved.
