import { SortBy } from '../containers/SearchPage/SearchPage'
import data from './mockdata.json'

export interface IssueItem {
  url: string
  title: string
}
type Language = 'Python' | 'JavaScript' | 'Java' | 'Ruby'

export interface RepoItem {
  name: string
  description: string
  html_url: string
  stargazers_count: string
  language: Language
  updated_at: string
  license: { name: string }
  owner: { login: string }
}

function setHeaders() {
  return {
    Authorization: 'Token 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',
    Accept: 'application/vnd.github.mercy-preview+json ',
  }
}
const sortMap = {
  'Best Match': '',
  'Top Starred': 'stars',
  'Top Forked': 'forks',
}
export async function getRepoTags(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/topics`,
    { headers: setHeaders() }
  )
  return await response.json()
}
export async function getTopIssues(
  owner: string,
  repo: string
): Promise<IssueItem[]> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?sort=comments&per_page=5`,
    { headers: setHeaders() }
  )
  return await response.json()
}
export function GETInitSearchOptions() {
  //TODO: integrate with GraphQl call
  return data
}

export async function getSearchResults(
  searchValue: string,
  page = 0,
  pageSize = 50,
  sort: SortBy
): Promise<RepoItem[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      searchValue
    )}&page=${page}&per_page${pageSize}&sort=${sortMap[sort]}`,
    { headers: setHeaders() }
  )
  return await response.json()
}
