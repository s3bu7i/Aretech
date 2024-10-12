import type { SubmitOptions, SubmitFunction } from "@remix-run/react";
type SubmitTarget = Parameters<SubmitFunction>["0"];
export declare function useDebounceSubmit(): (target: SubmitTarget, options?: SubmitOptions & {
    /** Submissions within this timeout will be canceled */
    debounceTimeout?: number;
}) => void;
export {};
