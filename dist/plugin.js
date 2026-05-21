import { RequestProfiler } from "./utils/RequestProfiler.js";
export function withProfiler(client) {
    const next = client.dispatch;
    client.dispatch = async (req) => {
        const { result, profile } = await RequestProfiler.profile(() => next(req));
        if (profile.durationMs > 500) {
            console.warn(`Slow request detected (${profile.durationMs.toFixed(2)}ms):`, req.url);
        }
        return result;
    };
    return client;
}
export const ProfilerPlugin = {
    name: "hyperttp-profiler",
    phase: "START",
    enabled: (config) => !!config.profiler?.enabled,
    apply: (client) => withProfiler(client),
};
//# sourceMappingURL=plugin.js.map