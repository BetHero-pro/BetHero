import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { fetchAllLogs } from '../fetches'
import { useEffect, useState } from 'react'
const PlayerLogs = ({ shouldOpen, userId }) => {

    const [logs, setLogs] = useState([]);
    useEffect(() => {
        fetchAllLogs(setLogs, userId)


    }, [])

    return (
        <BottomSheet open={shouldOpen}
            snapPoints={({ maxHeight }) => [
                maxHeight - maxHeight / 10,

            ]}
        >
            <div>haha</div>
            <div>
                {logs.map((log, index) =>
                    <div>{index + 1}</div>

                )}
            </div>

        </BottomSheet>
    )
}

export default PlayerLogs
