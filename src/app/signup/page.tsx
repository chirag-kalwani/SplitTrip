'use client'
import {useState} from "react";
import Input from "@/components/Inputs/Input";
import Link from "next/link";
import {useRouter} from 'next/navigation'
import axios from "axios";
import PasswordV from 'password-validator'
import EmailV from 'email-validator';
import Spinner from "@/components/Spinners/Spinner";
import CloseButton from "@/components/Buttons/CloseButton";

function SignUp() {
    const router = useRouter();
    const [err, setErr] = useState({is: false, type: ``});
    const [loading, setLoading] = useState(false);
    let schema = new PasswordV();
    schema.is().min(5).is().max(50);

    function showError(type: string) {
        setErr({is: true, type});
    }

    function handleRemoveError(e: any) {
        e.preventDefault();
        setErr({is: false, type: ""});
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const data = {
            userName: e.target.form[0].value,
            email: e.target.form[1].value,
            password: e.target.form[2].value,
            confirmPassword: e.target.form[3].value
        }
        if (!schema.validate(data.password)) {
            showError("Passwords must of minimum Len: 5");
        } else if (!EmailV.validate(data.email)) {
            showError("Email is of wrong format");
        } else if (data.password !== data.confirmPassword) {
            showError("Passwords Are Not Matching");
        } else {
            try {
                setLoading(true);
                const res = await axios.post('/api/users/signup', data);
                if (res.status === 201) {
                    setErr({is: false, type: ""});
                    console.log(res.data);
                    router.push('/login');
                }
            } catch (e: any) {
                showError(`Something went Wrong OR User with This email/username is already exist OR You missed some fields`);
                console.error("In SignUp Page: ", e);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <Input label={"Username"} type={"text"} id={"Rusername"} placeholder={"username"}/>
                            <Input label={"Your Email"} type={"email"} id={"Remail"} placeholder={"name@company.com"}/>
                            <Input label={"Password"} type={"password"} id={"RPassword"} placeholder={"••••••••"}/>
                            <Input label={"Confirm password"} type={"password"} id={"RcPassword"}
                                   placeholder={"••••••••"}/>
                            {err.is &&
                                <div className="flex justify-evenly items-center">
                                    <p className="text-red-500">{err.type} </p>
                                    <div onClick={handleRemoveError}>
                                        <CloseButton/>
                                    </div>
                                </div>
                            }
                            {loading && <Spinner/>}
                            <button type="submit" onClick={handleSubmit}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                                an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login"
                                                               className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                                here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;