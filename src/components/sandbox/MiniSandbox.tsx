/**
 * MiniSandbox
 * Wembley Wonders CIC
 * 
 * Re-exports MiniSandboxBase and related components for convenience.
 * The actual implementation is in src/components/sandboxes/mini/MiniSandboxBase.tsx
 */

// Re-export everything from MiniSandboxBase
export {
  default,
  default as MiniSandbox,
  ConstraintMeter,
  SessionTimer
} from '../sandboxes/mini/MiniSandboxBase';

// Re-export types
export type {
  SandboxConstraints,
  SandboxPrompt,
  SandboxResult,
  MiniSandboxBaseProps
} from '../sandboxes/mini/MiniSandboxBase';
