import styled from '@emotion/styled'

const TitleStyled = styled.a``

const ResultItemStyled = styled.div``
interface RepoItem {
  name: string
  html_url: string
}
interface ResultItemProps {
  data: RepoItem
}
export default function ResultItem({ data }: ResultItemProps) {
  return (
    <ResultItemStyled>
      <TitleStyled href={data.html_url}>{data.name}</TitleStyled>
    </ResultItemStyled>
  )
}
