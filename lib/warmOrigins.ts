import { preconnect } from "react-dom";

/**
 * Opens DNS, TCP and TLS to cross-origin destinations before the visitor clicks,
 * so a link that opens in a new tab paints sooner. React dedupes repeat calls,
 * so this is safe to call on every hover, focus or viewport entry.
 */
export function warmOrigins(...urls: string[]) {
    for (const url of urls) {
        try {
            preconnect(new URL(url).origin);
        } catch {
            // Ignore malformed URLs; warming is only an optimisation.
        }
    }
}
