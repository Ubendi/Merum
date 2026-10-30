# 01-upgrade-automapper: Upgrade AutoMapper in Merum-BE

## Objective
Update the direct AutoMapper dependency to the latest compatible stable version, then restore and validate the .NET 9 project without touching unrelated work.

## Confirmed Research
- Scope: `Merum-BE.sln` contains one project, `Merum-BE.csproj`.
- Target framework: `net9.0`.
- Package management: standard per-project `PackageReference`; `get_project_dependencies` found no Central Package Management declaration or imported package version source.
- Current package reference: `AutoMapper` 15.0.1 in `Merum-BE.csproj`.
- Resolved target: `AutoMapper` 16.2.0, latest compatible stable version, unified across the one scoped project.
- Assessment: `apidiff/AutoMapper.apidiff.md` reports no source-breaking public API changes from 15.0.1 to 16.2.0. Quick mode found no heuristic removed-API or signature-change usage.
- Unrelated changes: were stashed before scenario initialization and must be restored after validation.

## Execution Steps
1. Change only the AutoMapper `PackageReference` version in `Merum-BE.csproj` from 15.0.1 to 16.2.0.
2. Restore and build the project with `dotnet` using the SDK-style project path.
3. Review errors and warnings; make only minimal AutoMapper compatibility changes if the build requires them.
4. Verify the final package version, build output, and preservation/restoration of the unrelated stash.

**Done when**: `Merum-BE.csproj` references AutoMapper 16.2.0, restore succeeds, the project builds successfully without upgrade-related warnings or errors, and unrelated working-tree changes are preserved.
