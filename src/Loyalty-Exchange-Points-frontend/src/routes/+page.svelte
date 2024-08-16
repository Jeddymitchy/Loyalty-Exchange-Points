<script>
    import { loyaltyExchangeActor } from '$lib/canisters';
    import { onMount } from 'svelte';

    let userId = '';
    let bongaPoints = 0;
    let naivasLoyaltyPoints = 0;
    let message = '';
    let userPoints = null;

    async function fetchUserPoints() {
      if (!userId) {
        message = 'Please enter a user ID.';
        return;
      }
      const points = await loyaltyExchangeActor.getUserPoints(userId);
      if (points) {
        userPoints = points;
        message = '';
      } else {
        message = 'User not found.';
      }
    }

    async function addOrUpdatePoints() {
      if (!userId) {
        message = 'Please enter a user ID.';
        return;
      }
      const result = await loyaltyExchangeActor.addOrUpdateUserPoints(userId, BigInt(bongaPoints), BigInt(naivasLoyaltyPoints));
      message = result;
      fetchUserPoints();  // Refresh points after updating
    }

    async function transferPoints(type, fromUserId, toUserId, points) {
      let result;
      if (type === 'bonga') {
        result = await loyaltyExchangeActor.transferBongaPoints(fromUserId, toUserId, BigInt(points));
      } else {
        result = await loyaltyExchangeActor.transferNaivasLoyaltyPoints(fromUserId, toUserId, BigInt(points));
      }
      message = result;
    }

    // On mount, you can pre-load some data if needed.
    onMount(() => {
      // Optionally, fetch data for a default user on load
      userId = 'user1';  // Example user
      fetchUserPoints();
    });
  </script>

  <style>
    .form-group {
      margin-bottom: 1rem;
    }
  </style>

  <div>
    <h1>Loyalty Point Exchange</h1>

    <div class="form-group">
      <label for="userId">User ID:</label>
      <input id="userId" type="text" bind:value={userId} placeholder="Enter User ID" />
    </div>

    <div class="form-group">
      <button on:click={fetchUserPoints}>Fetch User Points</button>
    </div>

    {#if userPoints}
      <div>
        <p><strong>Bonga Points:</strong> {userPoints.bongaPoints}</p>
        <p><strong>Naivas Loyalty Points:</strong> {userPoints.naivasLoyaltyPoints}</p>
      </div>
    {/if}

    <div class="form-group">
      <label for="bongaPoints">Add Bonga Points:</label>
      <input id="bongaPoints" type="number" bind:value={bongaPoints} min="0" />
    </div>

    <div class="form-group">
      <label for="naivasLoyaltyPoints">Add Naivas Loyalty Points:</label>
      <input id="naivasLoyaltyPoints" type="number" bind:value={naivasLoyaltyPoints} min="0" />
    </div>

    <div class="form-group">
      <button on:click={addOrUpdatePoints}>Add/Update Points</button>
    </div>

    <div class="form-group">
      <button on:click={() => transferPoints('bonga', 'user1', 'user2', 100)}>Transfer 100 Bonga Points from User1 to User2</button>
    </div>

    <div class="form-group">
      <button on:click={() => transferPoints('naivas', 'user1', 'user2', 50)}>Transfer 50 Naivas Points from User1 to User2</button>
    </div>

    {#if message}
      <p><strong>Message:</strong> {message}</p>
    {/if}
  </div>
