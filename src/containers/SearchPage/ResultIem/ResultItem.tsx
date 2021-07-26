import styled from '@emotion/styled'
import MetaInfoSticker from './MetaInfoSticker'
import { StarOutline, Brightness1, BookOutlined } from '@material-ui/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getRepoTags,
  getTopIssues,
  IssueItem,
  RepoItem,
} from '../../../utils/api'
import { Chip, Tooltip } from '@material-ui/core'
import { getRelativeTime } from '../../../utils/getRelativeTime'
const ChipStyled = styled(Chip)`
  margin: 2px;
`

const TitleSectionStyled = styled.div`
  display: flex;
  justify-content: left;
`
const IssueLinkStyled = styled.a``
const TitleStyled = styled.a`
  flex-grow: 0;
  width: fit-content;
`
const DescriptionStyled = styled.div`
  flex-grow: 0;
  width: fit-content;
`

const TopicSection = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const MetaInfoSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
`
const ResultItemStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: left;
  padding: 1em;
  border-bottom: 1px solid;
`

interface ResultItemProps {
  data: RepoItem
}

const languageColorMap = {
  Python: 'red',
  JavaScript: 'blue',
  Java: 'green',
  Ruby: 'yellow',
}
export default function ResultItem({ data }: ResultItemProps) {
  const [topics, setTopics] = useState([''])
  const [topIssues, setTopIssues] = useState<IssueItem[]>()
  const displayDescription = data.description
    ? data.description.slice(0, 117).concat('...')
    : null
  const relativeTime = getRelativeTime(new Date(data.updated_at), new Date())

  const fetchAndSetTopics = useCallback(async () => {
    const topicsData = await getRepoTags(data.owner.login, data.name)
    setTopics(topicsData.names)
  }, [data.name, data.owner.login])

  const fetchAndSetTopIssues = useCallback(async () => {
    const issuesData = await getTopIssues(data.owner.login, data.name)
    setTopIssues(
      issuesData.map((issue) => ({ title: issue.title, url: issue.url }))
    )
  }, [data.name, data.owner.login])

  const IssueTooltip = useMemo(() => {
    if (!topIssues || !topIssues.length) return <></>
    return (
      <>
        {topIssues?.map((issue) => (
          <IssueLinkStyled href={topIssues[0].url} key={topIssues[0].url}>
            {topIssues[0].title}
          </IssueLinkStyled>
        ))}
      </>
    )
  }, [topIssues])

  useEffect(() => {
    fetchAndSetTopics()
    fetchAndSetTopIssues()
  }, [fetchAndSetTopics, fetchAndSetTopIssues])
  return (
    <ResultItemStyled>
      <Tooltip
        enterDelay={500}
        leaveDelay={200}
        placement='left-start'
        title={IssueTooltip}
      >
        <TitleSectionStyled>
          <BookOutlined />
          <TitleStyled
            href={data.html_url}
          >{`${data.owner.login}/${data.name}`}</TitleStyled>
        </TitleSectionStyled>
      </Tooltip>
      <DescriptionStyled>{displayDescription}</DescriptionStyled>
      <TopicSection>
        {topics.map((topic) => (
          <ChipStyled label={topic} />
        ))}
      </TopicSection>
      <MetaInfoSection>
        <MetaInfoSticker label={data.stargazers_count} Icon={<StarOutline />} />
        <MetaInfoSticker
          label={data.language}
          Icon={
            <Brightness1
              style={{ color: languageColorMap[data.language] || 'initial' }}
            />
          }
        />
        {data.license?.name && <MetaInfoSticker label={data.license.name} />}
        <MetaInfoSticker label={`Last Updated: ${relativeTime}`} Icon={<></>} />
      </MetaInfoSection>
    </ResultItemStyled>
  )
}
