import React from "react"
import { useAppDispatch } from "../../assets/redux/hooks"
import { fetchAllWorks } from "../../assets/redux/slices/works/asyncThunks/fetchAllWorks"
import GanttChart from "../GanttChart/GanttChart"

function App() {

  const dispatch = useAppDispatch()
  React.useEffect(() => {
    (async () => { await dispatch(fetchAllWorks()) })()
  }, [])

  return (
    <div>
      <GanttChart />
    </div>
  )
}

export default App
