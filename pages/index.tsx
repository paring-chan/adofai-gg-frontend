import type { NextPage } from 'next'
import logo from '@assets/logo.svg'
import Content from '../components/layout/Content'
import styled from 'styled-components'
import React from 'react'
import Router from 'next/router'

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

const Home: NextPage = () => {
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
          await Router.push(
            '/levelList?query=' + encodeURIComponent(searchTerm)
          )
        }}
      >
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Song, Artist, or Creator"
        />
      </form>
    </Content>
  )
}

export default Home
