import {useSelector} from "react-redux";

export default function ResultAfterTest() {
    const result = useSelector((store) => {
        console.log(store.resultStore.result)
        return store.resultStore.result
    })
    return(
        <>
            <p>Hihi</p>
        </>
    )
}