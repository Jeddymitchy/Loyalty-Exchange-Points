import { c as create_ssr_component, d as add_attribute } from "../../chunks/ssr.js";
import { HttpAgent, Actor } from "@dfinity/agent";
const idlFactory = ({ IDL }) => {
  const LoyaltyPoints = IDL.Record({
    "naivasLoyaltyPoints": IDL.Nat,
    "bongaPoints": IDL.Nat
  });
  return IDL.Service({
    "addOrUpdateUserPoints": IDL.Func(
      [IDL.Text, IDL.Nat, IDL.Nat],
      [IDL.Text],
      []
    ),
    "getUserPoints": IDL.Func([IDL.Text], [IDL.Opt(LoyaltyPoints)], []),
    "transferBongaPoints": IDL.Func(
      [IDL.Text, IDL.Text, IDL.Nat],
      [IDL.Text],
      []
    ),
    "transferNaivasLoyaltyPoints": IDL.Func(
      [IDL.Text, IDL.Text, IDL.Nat],
      [IDL.Text],
      []
    )
  });
};
const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
const agent = new HttpAgent();
Actor.createActor(idlFactory, {
  agent,
  canisterId
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".form-group.svelte-1lg39ld{margin-bottom:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userId = "";
  let bongaPoints = 0;
  let naivasLoyaltyPoints = 0;
  $$result.css.add(css);
  return `<div><h1 data-svelte-h="svelte-tkwpuh">Loyalty Point Exchange</h1> <div class="form-group svelte-1lg39ld"><label for="userId" data-svelte-h="svelte-8bw0pm">User ID:</label> <input id="userId" type="text" placeholder="Enter User ID"${add_attribute("value", userId, 0)}></div> <div class="form-group svelte-1lg39ld"><button data-svelte-h="svelte-3y1cw8">Fetch User Points</button></div> ${``} <div class="form-group svelte-1lg39ld"><label for="bongaPoints" data-svelte-h="svelte-zq2rp1">Add Bonga Points:</label> <input id="bongaPoints" type="number" min="0"${add_attribute("value", bongaPoints, 0)}></div> <div class="form-group svelte-1lg39ld"><label for="naivasLoyaltyPoints" data-svelte-h="svelte-r9gsh">Add Naivas Loyalty Points:</label> <input id="naivasLoyaltyPoints" type="number" min="0"${add_attribute("value", naivasLoyaltyPoints, 0)}></div> <div class="form-group svelte-1lg39ld"><button data-svelte-h="svelte-1q830ii">Add/Update Points</button></div> <div class="form-group svelte-1lg39ld"><button data-svelte-h="svelte-mc3tik">Transfer 100 Bonga Points from User1 to User2</button></div> <div class="form-group svelte-1lg39ld"><button data-svelte-h="svelte-ufq1ik">Transfer 50 Naivas Points from User1 to User2</button></div> ${``}</div>`;
});
export {
  Page as default
};
