import CheckIcon from '$lib/components/icons/✅.svelte';
import WarningIcon from '$lib/components/icons/⚠️.svelte';
import GlobeIcon from '$lib/components/icons/🌐.svelte';
import PurseIcon from '$lib/components/icons/👛.svelte';
import SkullIcon from '$lib/components/icons/💀.svelte';
import MoneyBagIcon from '$lib/components/icons/💰.svelte';
import FlyingMoneyIcon from '$lib/components/icons/💸.svelte';
import LockIcon from '$lib/components/icons/🔐.svelte';
import WebIcon from '$lib/components/icons/🕸️.svelte';
import MoneyEyesIcon from '$lib/components/icons/🤑.svelte';
import MonocleIcon from '$lib/components/icons/🧐.svelte';
import PourIcon from '$lib/components/icons/🫗.svelte';
import JarIcon from '$lib/components/icons/🫙.svelte';
import PenIcon from '$lib/components/icons/✏️.svelte';
import BubblesIcon from '$lib/components/icons/🫧.svelte';
import HourglassIcon from '$lib/components/icons/⏳.svelte';
import type { ComponentType } from 'svelte';

export const CUSTOM_EMOJI_COMPONENTS: { [key: string]: ComponentType } = {
  ['✅']: CheckIcon,
  ['⚠️']: WarningIcon,
  ['🌐']: GlobeIcon,
  ['👛']: PurseIcon,
  ['💀']: SkullIcon,
  ['💰']: MoneyBagIcon,
  ['💸']: FlyingMoneyIcon,
  ['🔐']: LockIcon,
  ['🕸️']: WebIcon,
  ['🤑']: MoneyEyesIcon,
  ['🧐']: MonocleIcon,
  ['🫗']: PourIcon,
  ['🫙']: JarIcon,
  ['🫧']: BubblesIcon,
  ['⏳']: HourglassIcon,
  ['✏️']: PenIcon,
};
