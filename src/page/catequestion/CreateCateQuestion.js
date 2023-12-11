import {useDispatch, useSelector} from "react-redux";
import {store} from "../../redux/Store";
import {useFormik} from "formik";
import {createCateQuiz} from "../../service/CateQuizService";

export default function CreateCateQuestion(){

    const currentUser = useSelector((store) =>{
        return store.users.currentUser
    })
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            name:'',
            description:'',
            user:{
                id: currentUser.id
            }
        },
        onSubmit:(values) =>{
            console.log(values)
            dispatch(createCateQuestion(values))
        }
    })
}