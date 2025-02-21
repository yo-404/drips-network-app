<script lang="ts">
  import type { StepComponentEvents } from '$lib/components/stepper/types';
  import {
    getAddressDriverClient,
    getDripsClient,
    getSubgraphClient,
  } from '$lib/utils/get-drips-clients';
  import type { Writable } from 'svelte/store';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { CollectFlowState } from './collect-flow-state';
  import balances from '$lib/stores/balances';
  import tuple from '$lib/utils/tuple';
  import unreachable from '$lib/utils/unreachable';
  import wallet from '$lib/stores/wallet/wallet.store';
  import getCycle from '$lib/utils/drips/get-cycle';

  export let context: Writable<CollectFlowState>;

  const dispatch = createEventDispatcher<StepComponentEvents>();

  async function fetchBalancesAndSplits() {
    const dripsClient = await getDripsClient();
    const driverClient = await getAddressDriverClient();
    const subgraphClient = getSubgraphClient();
    const accountId = await driverClient.getAccountId();

    const calls = tuple(
      await dripsClient.getReceivableBalanceForUser(
        accountId,
        $context.tokenAddress ?? unreachable(),
        100,
      ),
      dripsClient.getSplittableBalanceForUser(accountId, $context.tokenAddress ?? unreachable()),
      dripsClient.getCollectableBalanceForUser(accountId, $context.tokenAddress ?? unreachable()),
      subgraphClient.getSplitsConfigByAccountId(accountId),
    );

    const [receivable, splittable, collectable, splitsData] = await Promise.all(calls);

    return {
      splittable,
      collectable,
      receivable,
      ownSplitsWeight: 1000000n - splitsData.reduce<bigint>((acc, cur) => acc + cur.weight, 0n),
      splitsConfig: splitsData,
    };
  }

  async function updateContext() {
    const { splittable, collectable, receivable, ownSplitsWeight, splitsConfig } =
      await fetchBalancesAndSplits();

    const { start, durationMillis } = await getCycle();

    context.update((c) => ({
      ...c,
      currentDripsCycle: {
        start,
        durationMillis,
      },
      balances: {
        splittable: splittable.splittableAmount,
        collectable: collectable.collectableAmount,
        receivable: receivable.receivableAmount,
      },
      ownSplitsWeight,
      splitsConfig,
    }));
  }

  async function updateCollectable() {
    await balances.updateBalances($wallet.dripsAccountId ?? unreachable());
  }

  async function promise() {
    await updateContext();
    await updateCollectable();
  }

  onMount(() =>
    dispatch('await', {
      promise,
      message: 'Fetching collectable amounts…',
    }),
  );
</script>
