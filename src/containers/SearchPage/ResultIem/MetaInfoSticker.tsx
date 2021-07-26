import styled from '@emotion/styled'
import { ReactElement } from 'react'

const DataStyled = styled.div`
  align-self: center;
`
const MetaInfoStickerStyled = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-right: 1em;
  align-items: flex-end;
`
interface MetaInfoStickerProps {
  Icon?: ReactElement
  label: string
}
export default function MetaInfoSticker({ Icon, label }: MetaInfoStickerProps) {
  return (
    <MetaInfoStickerStyled>
      <DataStyled>{label}</DataStyled>
      {Icon}
    </MetaInfoStickerStyled>
  )
}
