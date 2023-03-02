/// Contact.js

import ActionDisplay from "../components/ActionDisplay";

export default function Contact() {

    return (
        <ActionDisplay 
            showCart={false}
            renderIdentifier={() => <h1>Contact</h1>}
            render={() =>
                <div className="contact">
                    <p>If you have any general questions or concerns, email us at <a href="mailto:support@eember.ca">support@eember.ca</a>.</p>
                    <p>To request support on an order, email us at <a href="mailto:orders@eember.ca">orders@eember.ca</a> with your order ID.</p>
                    <p className="promise">(We will do our best to get back to you within one business day)</p>
                </div>
            } />
    );
}