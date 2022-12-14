/// Home.js

import ActionDisplay from "../components/ActionDisplay";

export default function Home() {

    return (
        <ActionDisplay 
            showCart={false}
            renderIdentifier={() => <h1>Home</h1>}
            render={() =>
                <div className="empty-action">
                    <h1>Nothing to see here...</h1>
                </div>
            } />
    );
}