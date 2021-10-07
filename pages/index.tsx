import type { NextPage } from 'next'
import logo from '@assets/logo.svg'
import Content from '../components/layout/Content'
import styled from 'styled-components'
import React from 'react'
import Router from 'next/router'
import { api } from '../utils/request'
import { Level } from '../typings/Level'
import RecentLevels from '../components/home/RecentLevels'
import TopPlays from '../components/home/TopPlays'

const LogoImage = styled.img`
  margin-top: 60px;
  max-width: 100%;
`

const Description = styled.h2`
  margin-top: 10px;
  a.highlight {
    color: #ffe76e;
  }
`

const SearchBar = styled.input`
  margin-top: 20px;
  width: 100%;
  max-width: 700px;
  background: rgba(0, 0, 0, 0.3);
  border-style: none;
  font-family: Quicksand, sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
`

const Home: NextPage<{ topPlays: any[]; recentLevels: Level[] }> = ({
  recentLevels,
  topPlays
}) => {
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <Content>
      <LogoImage src={logo.src} alt="Logo" />
      <Description>
        Based On The{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1PzLHfWmVWJHrBGnNSsLTsdH0ibdk0hB4MpKHET1nkpU/edit#gid=1848316468"
          target="_blank"
          rel="noreferrer"
          className="highlight"
        >
          Unofficial ADOFAI Forum
        </a>
      </Description>
      <form
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        onSubmit={async (e) => {
          e.preventDefault()
          if (!searchTerm) return
          await Router.push('/levels?query=' + encodeURIComponent(searchTerm))
        }}
      >
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Song, Artist, or Creator"
        />
      </form>
      <TopPlays topPlays={topPlays} />
      <RecentLevels levels={recentLevels} />
    </Content>
  )
}

Home.getInitialProps = async () => {
  const { data: topPlaysData } = await api
    .get<{ results: any[] }>('/api/v1/playLogs', {
      params: {
        offset: 0,
        amount: 3,
        sort: 'PP_DESC'
      }
    })
    .then(async ({ data }) => {
      return {
        data: await Promise.all(
          data.results.map(async (x) => {
            return {
              ...x,
              difficulty: (
                await api.get<{ difficulty: number }>(
                  `/api/v1/levels/${x.level.id}`
                )
              ).data.difficulty
            }
          })
        )
      }
    })

  const { data: recentLevels } = await api.get<{ results: any[] }>(
    '/api/v1/levels',
    {
      params: {
        offset: 0,
        amount: 10,
        sort: 'RECENT_DESC'
      }
    }
  )

  return {
    topPlays: topPlaysData || [],
    recentLevels: recentLevels.results || []
  }
}

export default Home
