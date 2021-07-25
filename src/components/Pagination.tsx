import styled from '@emotion/styled'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'
const PaginationStyled = styled.div``
interface PaginationProps {
  currentPage: number
  maxPage: number
  getPageData: (page: number) => void
}

function setPageNumbersToDisplay({
  currentPage,
  maxPage,
}: {
  currentPage: number
  maxPage: number
}) {
  return [
    [0, 1, 2],
    [99, 100],
  ]
}
export default function PaginationWrapper({
  currentPage,
  maxPage,
  getPageData,
}: PaginationProps) {
  const [lowerPages, upperPages] = setPageNumbersToDisplay({
    currentPage,
    maxPage,
  })
  return (
    <PaginationStyled>
      <Pagination
        page={currentPage}
        count={maxPage}
        onChange={(event: object, page: number) => {
          getPageData(page)
        }}
      />
    </PaginationStyled>
  )
}
