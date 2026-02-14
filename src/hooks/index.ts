// src/hooks/index.ts
// Barrel export for custom hooks

// The file './useROVContext' is currently not a module (no exports), which causes the
// "is not a module" compile error when re-exporting named symbols here.
// Provide local stub exports so this barrel compiles without depending on that file.
// Replace these stubs with real implementations or re-enable the re-export once
// src/hooks/useROVContext.ts exports the named hooks.

export const useROVContext = (..._args: unknown[]): any => {
  throw new Error(
    "useROVContext is not implemented in this build; please export it from './useROVContext'"
  );
};

export const useIsROVActive = (..._args: unknown[]): any => {
  throw new Error(
    "useIsROVActive is not implemented in this build; please export it from './useROVContext'"
  );
};

export const useROV = (..._args: unknown[]): any => {
  throw new Error(
    "useROV is not implemented in this build; please export it from './useROVContext'"
  );
};

export const useROVHandoff = (..._args: unknown[]): any => {
  throw new Error(
    "useROVHandoff is not implemented in this build; please export it from './useROVContext'"
  );
};
