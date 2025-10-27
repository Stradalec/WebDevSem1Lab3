export function AddButton({id, className, onClick}){
    return(
        <button id = {id}  className={className} onClick={onClick}>+</button>
    );
}