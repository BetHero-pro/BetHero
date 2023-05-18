import DiscordButton from "../components/DiscordButton";

const Login = ({ currentPage, setCurrentPage }) => {

    const handleClick = () => {
        setCurrentPage(2);
    }

    return (
        <div class="d-flex flex-col align-items-center">
            <div class="">
                <h1 class="font-title">Login</h1>
                <div class="d-flex justify-content-center py-5 my-5">
                    <DiscordButton
                        handleClick={handleClick}
                        isSSO={true}
                        url={''}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;