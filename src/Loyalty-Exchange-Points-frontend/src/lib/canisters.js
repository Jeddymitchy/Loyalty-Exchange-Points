import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as loyaltyExchangeIdlFactory } from '../../../declarations/Loyalty-Exchange-Points-backend/Loyalty-Exchange-Points-backend.did.js';
import { canisterId as loyaltyExchangeCanisterId } from '../../../declarations/Loyalty-Exchange-Points-backend/index.js';

const agent = new HttpAgent();

export const loyaltyExchangeActor = Actor.createActor(loyaltyExchangeIdlFactory, {
    agent,
    canisterId: loyaltyExchangeCanisterId,
});
