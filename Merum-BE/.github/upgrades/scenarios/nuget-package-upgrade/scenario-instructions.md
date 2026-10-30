# NuGet Package Upgrade

## Preferences
- **Flow Mode**: Automatic
- **Scope**: `Merum-BE.sln` / repository projects (one project: `Merum-BE.csproj`)
- **Package**: AutoMapper
- **Version Policy**: Latest compatible stable version; prerelease versions excluded
- **Code Scan**: Quick assessment by default; run exact breaking-change scan only if needed

## Decisions
- **AutoMapper target**: 16.2.0, the latest compatible stable version resolved by assessment.
- **Version reconciliation**: Unified across the single scoped project.
- **Package management**: Direct per-project `PackageReference` in `Merum-BE.csproj`; no central package management file detected.
- **Breaking changes**: Migrate only if the build identifies a required compatibility fix; the API diff reports no source-breaking changes.

## Source Control
- **Source Branch**: master
- **Working Branch**: upgrade-nuget-automapper
- **Pending Changes**: Stashed before initialization to preserve unrelated work
- **Commit Strategy**: After Each Task
- **Branch Sync**: Auto (Merge)
