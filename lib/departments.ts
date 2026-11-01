/**
 * McPrime Digital works as two separate departments, each with its own team, process and
 * engagements. Add-ons (AI brand ambassadors, UGC and paid advertising) extend the Filmmaking
 * Department and are offered only to its clients.
 */
export type Department = 'filmmaking' | 'automations';

/** How each department is named and coloured wherever the site tells them apart. */
export const DEPARTMENTS: Record<Department, { name: string; short: string; href: string; accent: string; index: string }> = {
    filmmaking: { name: 'Filmmaking Department', short: 'Filmmaking', href: '/filmmaking', accent: '#2D6BFF', index: '01' },
    automations: { name: 'Automations Department', short: 'Automations', href: '/automations', accent: '#22D3EE', index: '02' },
};
