import { goto } from '$app/navigation';
import { page } from '$app/stores';
import wallet from '$lib/stores/wallet/wallet.store';
import { get } from 'svelte/store';
import buildUrl from './build-url';

/**
 * Check if the user currently has their wallet connected. If they do, returns true and
 * doesnʼt do anything. If they donʼt, sends the user to /app, with a backTo query string so
 * they get back to where they wanted to go after connecting.
 * @returns True if the user is connected, false if the user isnʼt (and being re-routed to /app).
 */
export default function guardConnected(): boolean {
  const { connected } = get(wallet);
  const { initialized } = wallet;

  if (!connected && get(initialized)) {
    const { pathname } = get(page).url;
    goto(buildUrl('/app', { backTo: encodeURIComponent(pathname) }), { replaceState: true });

    return false;
  }

  return true;
}
