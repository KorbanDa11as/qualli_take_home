import styled from '@emotion/styled'
import Pagination from '@material-ui/lab/Pagination'
const PaginationStyled = styled.div``
interface PaginationProps {
  currentPage: number
  maxPage: number
  getPageData: (page: number) => void
}

export default function PaginationWrapper({
  currentPage,
  maxPage,
  getPageData,
}: PaginationProps) {
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
