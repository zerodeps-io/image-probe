import { ProbeSizeResults } from "./ProbeSizeResults";


export abstract class Probe {

    public abstract readonly type: string;
    public abstract readonly mimeType: string;

    public abstract probeType(buffer: Buffer): boolean;
    public abstract probeSize(buffer: Buffer): ProbeSizeResults | undefined;

}
