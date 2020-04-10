# react tags

### fiberMode
```javascript
export type TypeOfMode = number;

export const NoMode = 0b0000;
export const StrictMode = 0b0001;
// TODO: Remove BlockingMode and ConcurrentMode by reading from the root
// tag instead
export const BlockingMode = 0b0010;
export const ConcurrentMode = 0b0100;
export const ProfileMode = 0b1000;
```

### RootTag
```javascript

export type RootTag = 0 | 1 | 2;

export const LegacyRoot = 0;
export const BlockingRoot = 1;
export const ConcurrentRoot = 2;

```

### WorkTag
```javascript
export type WorkTag =| 0| 1| 2| 3| 4| 5| 6| 7| 8| 9| 10| 11| 12| 13| 14| 15| 16| 17| 18| 19| 20| 21| 22;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5;
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const FundamentalComponent = 20;
export const ScopeComponent = 21;
export const Block = 22;

```

### SideEffectTag

```javascript
export type SideEffectTag = number;

// Don't change these two values. They're used by React Dev Tools.
export const NoEffect = /*              */ 0b0000000000000;
export const PerformedWork = /*         */ 0b0000000000001;
// You can change the rest (and add more).
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
export const ContentReset = /*          */ 0b0000000010000;
export const Callback = /*              */ 0b0000000100000;
export const DidCapture = /*            */ 0b0000001000000;
export const Ref = /*                   */ 0b0000010000000;
export const Snapshot = /*              */ 0b0000100000000;
export const Passive = /*               */ 0b0001000000000;
export const Hydrating = /*             */ 0b0010000000000;
export const HydratingAndUpdate = /*    */ 0b0010000000100;

// Passive & Update & Callback & Ref & Snapshot
export const LifecycleEffectMask = /*   */ 0b0001110100100;

// Union of all host effects
export const HostEffectMask = /*        */ 0b0011111111111;

export const Incomplete = /*            */ 0b0100000000000;
export const ShouldCapture = /*         */ 0b1000000000000;

```

### HookEffectTag
```javascript

export type HookEffectTag = number;

export const NoEffect = /*  */ 0b000;
// Represents whether effect should fire.
export const HasEffect = /* */ 0b001;
// Represents the phase in which the effect (not the clean-up) fires.
export const Layout = /*    */ 0b010;
export const Passive = /*   */ 0b100;

```

### ExecutionContex
```javascript
type ExecutionContext = number;

const NoContext = /*                    */ 0b000000;
const BatchedContext = /*               */ 0b000001;
const EventContext = /*                 */ 0b000010;
const DiscreteEventContext = /*         */ 0b000100;
const LegacyUnbatchedContext = /*       */ 0b001000;
const RenderContext = /*                */ 0b010000;
const CommitContext = /*                */ 0b100000;
```

### RootExitStatus
```javascript
type RootExitStatus = 0 | 1 | 2 | 3 | 4 | 5;

const RootIncomplete = 0;
const RootFatalErrored = 1;
const RootErrored = 2;
const RootSuspended = 3;
const RootSuspendedWithDelay = 4;
const RootCompleted = 5;
```