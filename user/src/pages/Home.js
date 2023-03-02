/// Home.js

import ActionDisplay from "../components/ActionDisplay";

export default function Home() {

    return (
        <ActionDisplay 
            showCart={false}
            renderIdentifier={() => <h1>Home</h1>}
            render={() =>
                <div className="home">
                    <h1>Welcome to <span className="highlighted">Edmonton Ember!</span></h1>
                    <h2>Be sure to check out the <span className="highlighted">Store</span> to view our products!</h2>
                </div>
            } />
    );
}