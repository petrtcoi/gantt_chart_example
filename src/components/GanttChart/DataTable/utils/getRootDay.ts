import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../../assets/redux/hooks/index'
import { selectRootDate } from '../../../../assets/redux/slices/works/selectors'
import { getDateFromString } from '../../../../assets/utils/date'



export const getRootDay = () => {
  const stateRootDay = useAppSelector(selectRootDate, shallowEqual)
  return getDateFromString(stateRootDay)
}