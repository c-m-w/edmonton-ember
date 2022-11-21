/// ThankYou.js

import ActionDisplay from "../components/ActionDisplay";

export default function ThankYou() {

    return (
        <ActionDisplay 
            showCart={false}
            renderIdentifier={() => <h1>Order complete</h1>}
            render={() =>
                <div className="thank-you">
                    <h1>Thank you!</h1>
                    <h2>You will recieve an email confirmation shortly.</h2>
                </div>
            } />
    );
}