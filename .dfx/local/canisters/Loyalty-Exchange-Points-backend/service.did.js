export const idlFactory = ({ IDL }) => {
  const LoyaltyPoints = IDL.Record({
    'naivasLoyaltyPoints' : IDL.Nat,
    'bongaPoints' : IDL.Nat,
  });
  return IDL.Service({
    'addOrUpdateUserPoints' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat],
        [IDL.Text],
        [],
      ),
    'getUserPoints' : IDL.Func([IDL.Text], [IDL.Opt(LoyaltyPoints)], []),
    'transferBongaPoints' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat],
        [IDL.Text],
        [],
      ),
    'transferNaivasLoyaltyPoints' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
