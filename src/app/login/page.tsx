'use client'
import {useState} from 'react';
import Link from "next/link";
import Input from "@/components/Inputs/Input";
import {useRouter} from 'next/navigation'
import axios from 'axios'
import PasswordV from 'password-validator'
import EmailV from 'email-validator';
import Spinner from "@/components/Spinners/Spinner";
import CloseButton from "@/components/Buttons/CloseButton";
import Alert from "@/components/Alert/Alert";

function LoginPage() {
    const [err, setErr] = useState({is: false, msg: ""});
    const [loading, setLoading] = useState(false);
    let schema = new PasswordV();
    schema.is().min(5).is().max(50);
    const router = useRouter();

    function showError(type: string) {
        setErr({is: true, msg: type});
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const data = {
            email: e.target.form[0].value,
            password: e.target.form[1].value,
        }
        if (!schema.validate(data.password) || !EmailV.validate(data.email)) {
            showError("Credentials are not valid");
        } else {
            // validate data from database
            try {
                setLoading(true);
                const res = await axios.post('/api/users/login', data);
                if (res.status === 200) {
                    router.push('/');
                }
            } catch (e) {
                showError(`Either Credentials are not valid OR You missed some fields OR Internal Server Error`);
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <Input label={"Your Email"} type={"email"} id={"Remail"} placeholder={"name@company.com"}/>
                            <Input label={"Password"} type={"password"} id={"RPassword"} placeholder={"••••••••"}/>
                            <div className="flex items-center justify-between">
                                <a href="#"
                                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                    password?</a>
                            </div>
                            {
                                err.is && <Alert err={err} closeFunction={setErr}/>
                            }
                            {loading && <Spinner/>}
                            <button type="submit" onClick={handleSubmit}
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/signup"
                                                                 className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;