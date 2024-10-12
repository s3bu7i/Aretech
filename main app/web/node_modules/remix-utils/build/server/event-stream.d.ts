interface SendFunctionArgs {
    /**
     * @default "message"
     */
    event?: string;
    data: string;
}
interface SendFunction {
    (args: SendFunctionArgs): void;
}
interface CleanupFunction {
    (): void;
}
interface AbortFunction {
    (): void;
}
interface InitFunction {
    (send: SendFunction, abort: AbortFunction): CleanupFunction;
}
/**
 * A response helper to use Server Sent Events server-side
 * @param signal The AbortSignal used to close the stream
 * @param init The function that will be called to initialize the stream, here you can subscribe to your events
 * @returns A Response object that can be returned from a loader
 */
export declare function eventStream(signal: AbortSignal, init: InitFunction, options?: ResponseInit): Response;
export {};
