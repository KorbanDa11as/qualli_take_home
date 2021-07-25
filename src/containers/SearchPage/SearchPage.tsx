import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import PaginationWrapper from '../../components/Pagination'
import SearchDropdown from '../../components/SearchDropdown'
import { GETInitSearchOptions, getSearchResults } from '../../utils/api'
import ResultItem from './ResultItem'
const SearchPageStyled = styled.div``
interface SearchPageProps {}
export default function SearchPage({}: SearchPageProps) {
  const [searchResults, setSearchResults] = useState<any>({ items: [''] })
  const [searchValue, setSearchValue] = useState<string>('')
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    const searchResponse = getSearchResults(searchValue, page)
    setSearchResults(searchResponse)
  }, [page])
  useEffect(() => {
    const searchResponse = getSearchResults(searchValue, 0)
    setSearchResults(searchResponse)
  }, [searchValue])

  return (
    <SearchPageStyled>
      <SearchDropdown
        fetchOptions={GETInitSearchOptions}
        onSearch={(searchValue: string) => {
          setSearchValue(searchValue)
        }}
      />
      {/* {searchResults.items.map((resultItem: any) => {
        return <ResultItem data={resultItem}></ResultItem>
      })} */}
      <PaginationWrapper
        maxPage={100}
        currentPage={page}
        getPageData={(newPage) => setPage(newPage)}
      />
    </SearchPageStyled>
  )
}
