import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import accuracy from '@assets/other_icons/accuracy.svg'
import speed from '@assets/other_icons/speed.svg'

const Container = styled.article`
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #04152b80;
  border-radius: 10px;
  margin-bottom: 8px;
  padding-top: 3px;
  padding-bottom: 3px;

  &:nth-child(-n + 3) {
    background-color: #fafbff1f;
    &:hover {
      background-color: #33416199;
    }
    & > div:nth-child(2) {
      flex-direction: column;
      align-items: flex-start;
      padding-right: 30px;
      & > div {
        &:nth-child(2) {
          padding-left: 0;
        }

        &:nth-child(1) {
          width: 100%;
        }
      }
    }
  }

  &:nth-child(1) {
    height: 100px;
  }

  &:nth-child(2) {
    height: 90px;
  }

  &:nth-child(3) {
    height: 80px;
  }

  &,
  * {
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: #233b5e80;
  }
`

const Rank = styled.div`
  width: 70px;
  box-sizing: content-box;
  @media screen and (max-width: 1024px) {
    box-sizing: border-box;
  }
  height: calc(100% + 6px);
  padding-left: 18px;
  padding-right: 18px;
  margin-right: 15px;
  font-size: 1.25em;
  font-weight: 700;
  font-family: 'Roboto Mono', 'Quicksand', monospace;
  background-color: #020c1a4f;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
  align-items: center;
  display: flex;
  overflow: hidden;
`

const ItemName = styled.div`
  font-size: 1.2em;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 20%;
`

const Details = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  opacity: 0.8;
  gap: 10px;
  overflow: hidden;
  padding-left: 10px;
`

const TotalPP = styled.div`
  &::before {
    content: 'Total PP - ';
    font-weight: 400;
  }

  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 25%;
`

const HighestPlay = styled.div`
  width: 40%;
  &,
  * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  font-weight: 600;
  display: flex;
  align-items: center;
  &::before {
    content: 'Highest Play';
    font-weight: 400;
    margin-right: 8px;
  }
  a {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    flex-grow: 1;
  }
`

const HighestInfo = styled.span`
  flex-grow: 1;
  opacity: 0.8;
  font-size: 0.9em;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  gap: 10px;
`

const HighestInfoItem = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: flex-end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > img {
    height: 0.9em;
    margin-right: 3px;
  }
`

const RankingItem: React.FC<{ item: any; idx: number }> = ({ item, idx }) => {
  return (
    <Container>
      <Head>
        <title>Ranking - Adofai.gg</title>
      </Head>
      <Rank>#{idx + 1}</Rank>
      <Content>
        <ItemName>{item.name}</ItemName>
        <Details>
          <TotalPP>{item.totalBpm.toFixed(0)}</TotalPP>
          <HighestPlay>
            <Link
              href="/levels/[id]"
              passHref
              as={`/levels/${item.bestPlay.levelId}`}
            >
              <a>
                {item.bestPlay.artists[1]
                  ? `${item.bestPlay.artists[0]}…`
                  : item.bestPlay.artists[0]}
                {' - '}
                {item.bestPlay.title}
              </a>
            </Link>
          </HighestPlay>
          <HighestInfo>
            <HighestInfoItem>
              <img src={speed.src} alt="Speed Trial: " />
              {item.bestPlay.speed / 100}x
            </HighestInfoItem>
            {item.bestPlay.rawAccuracy && (
              <HighestInfoItem>
                <img src={accuracy.src} alt="Accuracy: " />
                {item.bestPlay.rawAccuracy.toFixed(1)}
              </HighestInfoItem>
            )}
            <HighestInfoItem>
              (Lv. {String(item.bestPlay.difficulty).replace('.5', '+')})
            </HighestInfoItem>
          </HighestInfo>
        </Details>
      </Content>
    </Container>
  )
}

export default RankingItem
