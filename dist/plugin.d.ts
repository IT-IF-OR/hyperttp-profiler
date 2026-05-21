import type { HyperCore, HyperPlugin } from "@hyperttp/core";
export declare function withProfiler(client: HyperCore): HyperCore;
declare module "@hyperttp/core" {
    interface HyperttpPluginsExtension {
        profiler?: {
            enabled: boolean;
        };
    }
}
export declare const ProfilerPlugin: HyperPlugin;
//# sourceMappingURL=plugin.d.ts.map