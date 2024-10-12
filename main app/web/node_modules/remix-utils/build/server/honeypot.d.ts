export interface HoneypotInputProps {
    nameFieldName: string;
    validFromFieldName: string | null;
    encryptedValidFrom: string;
}
export interface HoneypotConfig {
    randomizeNameFieldName?: boolean;
    nameFieldName?: string;
    validFromFieldName?: string | null;
    encryptionSeed?: string;
}
export declare class SpamError extends Error {
}
export declare class Honeypot {
    protected config: HoneypotConfig;
    private generatedEncryptionSeed;
    constructor(config?: HoneypotConfig);
    getInputProps({ validFromTimestamp, }?: {
        validFromTimestamp?: number | undefined;
    }): HoneypotInputProps;
    check(formData: FormData): void;
    protected get nameFieldName(): string;
    protected get validFromFieldName(): string | null;
    protected get encryptionSeed(): string;
    protected getRandomizedNameFieldName(nameFieldName: string, formData: FormData): string | undefined;
    protected shouldCheckHoneypot(formData: FormData, nameFieldName: string): boolean;
    protected randomValue(): string;
    protected encrypt(value: string): string;
    protected decrypt(value: string): string;
    protected isFuture(timestamp: number): boolean;
    protected isValidTimeStamp(timestampp: number): boolean;
}
