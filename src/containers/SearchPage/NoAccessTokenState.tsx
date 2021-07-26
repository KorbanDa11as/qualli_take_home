import styled from '@emotion/styled'

const NoAccessTokenStateStyled = styled.div``
interface NoAccessTokenProps {}
export default function NoAccessTokenState({}: NoAccessTokenProps) {
  return (
    <NoAccessTokenStateStyled>
      SETUP YOUR ACCESS TOKEN FIRST!! read the readme
    </NoAccessTokenStateStyled>
  )
}
