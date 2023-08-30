
const StatusLight = ({ status }) => {

    return (
        <div className="flex items-center space-x-2">

            <div

                className={`rounded-full h-6 w-6   ${status.play ? 'bg-green-300 ' : 'bg-white'}`}
            />
            <div

                className={`rounded-full h-6 w-6  ${status.rest ? 'bg-orange-300 ' : 'bg-white'}`}
            />
            <div

                className={`rounded-full h-6 w-6   ${status.wandering ? 'bg-blue-300' : 'bg-white'}`}
            />

        </div>
    );
};

export default StatusLight;