import type {
  HyperCore,
  HyperPlugin,
  InternalRequest,
  HttpClientOptions,
} from "@hyperttp/core";
import { RequestProfiler } from "./utils/RequestProfiler.js";

export function withProfiler(client: HyperCore): HyperCore {
  const next = client.dispatch;

  client.dispatch = async <T = any>(req: InternalRequest): Promise<T> => {
    const { result, profile } = await RequestProfiler.profile(() =>
      next<T>(req),
    );

    if (profile.durationMs > 500) {
      console.warn(
        `Slow request detected (${profile.durationMs.toFixed(2)}ms):`,
        req.url,
      );
    }

    return result as unknown as T;
  };

  return client;
}

declare module "@hyperttp/core" {
  interface HyperttpPluginsExtension {
    profiler?: { enabled: boolean };
  }
}

export const ProfilerPlugin: HyperPlugin = {
  name: "hyperttp-profiler",
  phase: "START",
  enabled: (config: HttpClientOptions) => !!config.profiler?.enabled,
  apply: (client: HyperCore) => withProfiler(client),
};
