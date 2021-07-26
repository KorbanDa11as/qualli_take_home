import styled from '@emotion/styled'
import { CircularProgress } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import PaginationWrapper from '../../components/Pagination'
import SearchDropdown from '../../components/SearchDropdown'
import Selector from '../../components/Selector'
import { GETInitSearchOptions, getSearchResults } from '../../utils/api'
import ResultItem from './ResultIem/ResultItem'

export enum SortBy {
  BestMatch = 'Best Match',
  TopStarred = 'Top Starred',
  TopForked = 'Top Forked',
}

const EmptyStateStyled = styled.div``
const ResultsListStyled = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: start;
`
const SortSelectionStyled = styled(Selector)``
const SearchDropdownStyled = styled(SearchDropdown)`
  display: flex;
  max-width: 20em;
`
const SearchPageStyled = styled.div``

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any>({ items: [] })
  const [searchValue, setSearchValue] = useState<string>('')
  const [sort, setSort] = useState<SortBy>(SortBy.BestMatch)
  const [page, setPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const DEFAULT_PAGE_SIZE = 50

  const fetchAndSetSearchResults = useCallback(async () => {
    setIsLoading(true)
    const searchResponse = await getSearchResults(
      searchValue,
      page,
      DEFAULT_PAGE_SIZE,
      sort
    )
    setSearchResults(searchResponse)
    setIsLoading(false)
  }, [searchValue, page, sort])

  useEffect(() => {
    if (!searchValue.length) return
    fetchAndSetSearchResults()
  }, [page, searchValue, sort, fetchAndSetSearchResults])
  if (!searchResults.items.length && !isLoading)
    return (
      <SearchPageStyled>
        <SearchDropdownStyled
          fetchOptions={GETInitSearchOptions}
          onSearch={(searchValue: string) => {
            setSearchValue(searchValue)
          }}
        />
        <EmptyStateStyled>Empty List</EmptyStateStyled>
      </SearchPageStyled>
    )
  return (
    <SearchPageStyled>
      <SearchDropdownStyled
        fetchOptions={GETInitSearchOptions}
        onSearch={(searchValue: string) => {
          setSearchValue(searchValue)
        }}
      />
      {!searchResults.length && !isLoading}
      {!isLoading ? (
        <>
          <SortSelectionStyled
            selected={sort}
            setSelected={setSort}
            options={Object.entries(SortBy)}
          />
          <ResultsListStyled>
            {searchResults.items.map((resultItem: any, index: number) => {
              return <ResultItem key={index} data={resultItem}></ResultItem>
            })}
          </ResultsListStyled>
          <PaginationWrapper
            maxPage={Math.ceil(searchResults.total_count / DEFAULT_PAGE_SIZE)}
            currentPage={page}
            getPageData={(newPage) => setPage(newPage)}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </SearchPageStyled>
  )
}
