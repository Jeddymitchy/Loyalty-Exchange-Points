import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface LoyaltyPoints {
  'naivasLoyaltyPoints' : bigint,
  'bongaPoints' : bigint,
}
export interface _SERVICE {
  'addOrUpdateUserPoints' : ActorMethod<[string, bigint, bigint], string>,
  'getUserPoints' : ActorMethod<[string], [] | [LoyaltyPoints]>,
  'transferBongaPoints' : ActorMethod<[string, string, bigint], string>,
  'transferNaivasLoyaltyPoints' : ActorMethod<[string, string, bigint], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
