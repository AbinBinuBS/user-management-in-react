import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () =>{
    const [value,setValue] = useState({
        name:"",
        email:"",
        phone:""
    })

    const handleChange = (e)=>{
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const addUser = await axios.post('http://localhost:4000/api/create',value)
            const responce = addUser.data
            if(responce.success){
                toast.success(responce.message)
            }
        } catch (error) {
            
        }
        console.log(value);
    }
    return(
        <div>
           <form className="flex" onSubmit={(e)=>handleSubmit(e)}>
                <div className="text-center  mx-auto my-32">
                    <div>
                        <input value={value.name} onChange={(e)=>handleChange(e)} className="border  mt-5 border-black" type="text" name="name" />
                    </div>
                    <div>
                        <input value={value.email} onChange={(e)=>handleChange(e)}  className="border mt-5 border-black" type="text" name="email" />
                    </div>
                    <div>
                        <input value={value.phone} onChange={(e)=>handleChange(e)}  className="border mt-5 border-black" type="text" name="phone" />
                    </div>
                    <div>
                        <button className="border mt-5 border-black" >Submit</button>
                    </div>
                </div>
           </form>
        </div>
    )
}
export default Login