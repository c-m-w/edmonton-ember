/// Contact.js

import ActionDisplay from "../components/ActionDisplay";

export default function Contact() {

    return (
        <ActionDisplay 
            showCart={false}
            renderIdentifier={() => <h1>Contact</h1>}
            render={() =>
                <div className="empty-action">
                    <h1>Nothing to see here...</h1>
                </div>
            } />
    );
}