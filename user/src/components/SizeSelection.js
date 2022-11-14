/// SizeSelection.js

export default function SizeSelection(props) {

    return (
        <div
            className={"size-selection"
                        + (props.available && props.stock !== 0 ? "" : " disabled")
                        + (props.selected ? " selected" : "")}
            onClick={() => {props.available && props.onClick(props.id)}}>
            <span className="amount">{props.amount}g</span>
            <span className="price">${props.price}</span>
        </div>
    )
}