# Copilot Instructions

## Project Guidelines
- Keep UnitOfWork in the architecture so the service layer remains separated from the database/repository layer; do not remove it during refactoring. It should remain DI-scoped, use the injected scoped DbContext, and not manually dispose the DbContext.