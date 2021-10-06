import React from 'react'
import { Level } from '../../typings/Level'
import LevelListItem from '../levels/LevelListItem'
import styled from 'styled-components'
import Link from 'next/link'

const Title = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`

const RecentLevels: React.FC<{ levels: Level[] }> = ({ levels }) => {
  return (
    <section style={{ width: '100%', maxWidth: 1100 }}>
      <Title>
        <h1>Recent Ranked Levels</h1>
        <h3>
          <Link passHref href="/levels">
            <a>See All ▹</a>
          </Link>
        </h3>
      </Title>
      <div style={{ marginTop: 10 }}>
        {levels.map((x, i) => (
          <LevelListItem levelData={x} key={i} />
        ))}
      </div>
    </section>
  )
}

export default RecentLevels
