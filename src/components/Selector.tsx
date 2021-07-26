import styled from '@emotion/styled'
import { MenuItem, Select } from '@material-ui/core'
import { Dispatch, SetStateAction } from 'react'
import { SortBy } from '../containers/SearchPage/SearchPage'
const SelectorStyled = styled.div``
interface SelectorProps {
  selected: string
  setSelected: Dispatch<SetStateAction<SortBy>>
  options: [string, string][]
}
export default function Selector({
  selected,
  setSelected,
  options,
}: SelectorProps) {
  const handleChange = (event: any) => {
    setSelected(event.target.value)
  }
  return (
    <SelectorStyled>
      <Select onChange={handleChange} value={selected}>
        {options.map(([key, value]) => (
          <MenuItem value={value}>{value}</MenuItem>
        ))}
      </Select>
    </SelectorStyled>
  )
}
