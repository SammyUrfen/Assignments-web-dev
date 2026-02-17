export default function Hello(props) {
    let {name,age} = props
    return (<h1>Hello {name} Thanks Babel is {age} old </h1>);
}