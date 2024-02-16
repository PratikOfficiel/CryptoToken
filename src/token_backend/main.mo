import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {

    let owner : Principal = Principal.fromText("pi5o3-jslsz-5s7we-rf4ke-h6pem-rymha-dew2r-5nm4x-xmpo7-6aacg-rae");
    let amount : Nat = 1000000000;
    let symbol: Text = "DINOVA";

    private stable var balanceEntries: [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
        balances.put(owner, amount);
    };

    public query func balanceOf(who: Principal) : async Nat {

        var balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func grant(): async Text {

        Debug.print(debug_show(msg.caller));

        if(balances.get(msg.caller) == null ){
            let result = await transfer(msg.caller, 10000);
            return result;
        } else{
            return "Already Claimed !";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        
        var senderBalance : Nat = await balanceOf(msg.caller);
        var recieverBalance: Nat = await balanceOf(to);
        if(senderBalance >= amount){
            balances.put(msg.caller, senderBalance-amount);
            balances.put(to, recieverBalance+amount);
            return "Sucessfull !";
        }
        else {
            return "Insufficient funds !";
        }
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat> (balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        if (balances.size() < 1) {
            balances.put(owner, amount);
        }
    };
};