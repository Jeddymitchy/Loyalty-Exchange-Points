import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor LoyaltyPointExchange {

    type LoyaltyPoints = {
        bongaPoints: Nat;
        naivasLoyaltyPoints: Nat;
    };

    var userPointsStore: HashMap.HashMap<Text, LoyaltyPoints> = HashMap.HashMap<Text, LoyaltyPoints>(10, Text.equal, Text.hash);

    // Dummy data with explicit type annotation
    let initialUsers: [(Text, LoyaltyPoints)] = [
        ("user1", { bongaPoints = 1000; naivasLoyaltyPoints = 500 }),
        ("user2", { bongaPoints = 800; naivasLoyaltyPoints = 700 })
    ];

    // Initialize the store with dummy data
    for (user in initialUsers.vals()) {
        userPointsStore.put(user.0, user.1);
    };

    public shared func addOrUpdateUserPoints(userId: Text, bongaPoints: Nat, naivasLoyaltyPoints: Nat) : async Text {
        let currentPoints = userPointsStore.get(userId);
        switch currentPoints {
            case (?points) {
                userPointsStore.put(userId, {
                    bongaPoints = points.bongaPoints + bongaPoints;
                    naivasLoyaltyPoints = points.naivasLoyaltyPoints + naivasLoyaltyPoints;
                });
                return "Points updated!";
            };
            case null {
                let newPoints: LoyaltyPoints = {
                    bongaPoints = bongaPoints;
                    naivasLoyaltyPoints = naivasLoyaltyPoints;
                };
                userPointsStore.put(userId, newPoints);
                return "New user added and points updated!";
            };
        };
    };

    public shared func getUserPoints(userId: Text) : async ?LoyaltyPoints {
        return userPointsStore.get(userId);
    };

    public shared func transferBongaPoints(fromUserId: Text, toUserId: Text, points: Nat) : async Text {
        let fromUserPoints = userPointsStore.get(fromUserId);
        let toUserPoints = userPointsStore.get(toUserId);

        switch fromUserPoints {
            case (?fromPoints) {
                if (fromPoints.bongaPoints >= points) {
                    let updatedFromPoints: LoyaltyPoints = {
                        bongaPoints = fromPoints.bongaPoints - points;
                        naivasLoyaltyPoints = fromPoints.naivasLoyaltyPoints;
                    };
                    userPointsStore.put(fromUserId, updatedFromPoints);

                    let updatedToPoints: LoyaltyPoints = switch toUserPoints {
                        case (?toPoints) {
                            {
                                bongaPoints = toPoints.bongaPoints + points;
                                naivasLoyaltyPoints = toPoints.naivasLoyaltyPoints;
                            }
                        };
                        case null {
                            {
                                bongaPoints = points;
                                naivasLoyaltyPoints = 0;
                            }
                        };
                    };
                    userPointsStore.put(toUserId, updatedToPoints);
                    return "Bonga Points transfer successful!";
                } else {
                    return "Insufficient Bonga Points!";
                }
            };
            case null {
                return "From user not found!";
            };
        };
    };

    public shared func transferNaivasLoyaltyPoints(fromUserId: Text, toUserId: Text, points: Nat) : async Text {
        let fromUserPoints = userPointsStore.get(fromUserId);
        let toUserPoints = userPointsStore.get(toUserId);

        switch fromUserPoints {
            case (?fromPoints) {
                if (fromPoints.naivasLoyaltyPoints >= points) {
                    let updatedFromPoints: LoyaltyPoints = {
                        bongaPoints = fromPoints.bongaPoints;
                        naivasLoyaltyPoints = fromPoints.naivasLoyaltyPoints - points;
                    };
                    userPointsStore.put(fromUserId, updatedFromPoints);

                    let updatedToPoints: LoyaltyPoints = switch toUserPoints {
                        case (?toPoints) {
                            {
                                bongaPoints = toPoints.bongaPoints;
                                naivasLoyaltyPoints = toPoints.naivasLoyaltyPoints + points;
                            }
                        };
                        case null {
                            {
                                bongaPoints = 0;
                                naivasLoyaltyPoints = points;
                            }
                        };
                    };
                    userPointsStore.put(toUserId, updatedToPoints);
                    return "Naivas Loyalty Points transfer successful!";
                } else {
                    return "Insufficient Naivas Loyalty Points!";
                }
            };
            case null {
                return "From user not found!";
            };
        };
    };
}
