import LoginButton from '../components/LoginButton'

const LoginPage = () => {

    return (
        <div className='w-fit p-5 h-full bg-red-200 mx-auto flex flex-col justify-center'>
                <div className='flex items-center mx-auto text-2xl bg-sky'>Login Page</div>
                {<LoginButton/>}
        </div>
    )
}

export default LoginPage