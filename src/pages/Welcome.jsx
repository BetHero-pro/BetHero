const Welcome = ({ currentPage, setCurrentPage }) => {

    const handleClick = () => {
        setCurrentPage(1);
    }

    return (
        <div class="d-flex flex-col align-items-center">
            <div class="">
                <h1 class="font-title">Welcome to BetHero</h1>
                <div class="d-flex justify-content-center">
                    <img width="50%" height="50%" src="Logo.png" />
                </div>
                <div class="d-flex justify-content-center pt-5">
                    <button class="btn btn-secondary custom-btn" onClick={handleClick}><span class="fs-4">Enter</span></button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;