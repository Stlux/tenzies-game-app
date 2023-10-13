
export default function Element(props){
    return (
        <li
            className="number"
            style={props.freezeStyles}
            onClick={!props.freezeStyles ? () => props.func(props.number, props.id) : () => {}}>
            {props.number}
        </li>
    )
}