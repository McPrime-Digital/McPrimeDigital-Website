/**
 * Turn a stored video key like
 *   videos/filmmaking-portfolio/1788691869430-THE-PRIMERS-HOTEL-2.mp4
 * into a human display name: "THE PRIMERS HOTEL 2".
 * Named entries in each component's videoMeta take precedence over this fallback.
 */
export function prettifyFilename(key: string): string {
    const filename = key.split('/').pop() || key;
    return filename
        .replace(/^\d+-/, '')
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
