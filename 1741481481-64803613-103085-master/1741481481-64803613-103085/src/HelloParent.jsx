import Hello from "./Hello";
import Bye from "./Bye";


function HelloParent() {
    let prop = {
        name : "Jasbir",
        age : 25
    };
    return (<div>
        <Bye /> 
        <Hello {...prop}/>
        <Hello {...prop}/>
        <Hello {...prop}/>
        <Hello {...prop}/>
    </div>)
}


export default HelloParent;