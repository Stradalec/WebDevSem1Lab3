export function AddButton({id, className, content, onClick}){
    return(
        <button id = {id}  className={className} onClick={onClick}>{content}</button>
    );
}