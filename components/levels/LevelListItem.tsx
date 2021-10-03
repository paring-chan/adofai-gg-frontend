import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons'
import LevelTags from './LevelTags'
import clsx from 'clsx'

const Container = styled.a`
  width: 100%;
  height: 70px;
  margin-bottom: 8px;
  transition: all 0.2s ease;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  overflow: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);

    .content {
      .hover {
        opacity: 1 !important;
        visibility: visible !important;
      }
      .noHover {
        opacity: 0 !important;
        visibility: hidden !important;
      }
    }
  }

  .difficulty-icon {
    border-radius: 100%;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.288);
  }

  .content {
    position: relative;
    flex-grow: 1;
    height: 100%;
    .sections {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      transition: all 0.2s ease;

      &.hover {
        visibility: hidden;
        opacity: 0;
      }

      &.noHover {
        opacity: 1;
        visibility: visible;
      }

      .section {
        overflow: hidden;
        height: 100%;
        .header {
          color: #b3b3b3;
          font-weight: 600;
          font-size: 15px;
          height: 20px;
          .id {
            margin-left: 5px;
            opacity: 0.5;
            &::before {
              content: '#';
            }
          }
          &.ew::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            margin-left: 5px;
            margin-top: 5px;
            margin-bottom: 5px;
            background-color: #ff5c3187;
            border-radius: 100%;
          }
        }
        .value {
          font-size: 20px;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 500;
        }
      }
    }
  }
`

const LevelListItem: React.FC<{ levelData: any }> = ({ levelData }) => {
  const {
    id,
    title,
    difficulty,
    creators,
    song,
    artists,
    minBpm,
    maxBpm,
    tiles,
    comments,
    likes,
    tags,
    epilepsyWarning
  } = levelData

  const DifficultyIcon = () => (
    <img
      className="difficulty-icon"
      src={require(`@assets/difficulty_icons/${difficulty}.svg`).default.src}
      alt={`Lv. ${difficulty}`}
    />
  )

  return (
    <Link as={`/levels/${id}`} passHref href={'/levels/[id]'}>
      <Container>
        <DifficultyIcon />
        <div className="content">
          <div className="sections noHover">
            <div className="section" style={{ width: '30%' }}>
              <div
                className={clsx('header', {
                  ew: epilepsyWarning
                })}
              >
                Level<span className="id">{id}</span>
              </div>
              <div className="value">{title}</div>
            </div>
            <div className="section" style={{ width: '20%' }}>
              <div className="header">Creator</div>
              <div className="value">{creators.join(' & ')}</div>
            </div>
            <div className="section" style={{ width: '15%' }}>
              <div className="header">BPM</div>
              <div className="value">
                {minBpm === maxBpm
                  ? minBpm
                  : minBpm.toString() + '-' + maxBpm.toString()}
              </div>
            </div>
            <div
              className="section"
              style={{ width: '15%', textAlign: 'center' }}
            >
              <div className="header">Tiles</div>
              <div className="value">{tiles}</div>
            </div>

            <div
              className="section"
              style={{ width: '10%', textAlign: 'center' }}
            >
              <div className="header">
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={{ height: '12px', color: 'white' }}
                />
              </div>
              <div className="value">{comments}</div>
            </div>
            <div
              className="section"
              style={{ width: '10%', textAlign: 'center' }}
            >
              <div className="header">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ height: '12px', color: '#FF4E4E' }}
                />
              </div>
              <div className="value">{likes}</div>
            </div>
          </div>
          <div className="sections hover">
            <div className="section" style={{ width: 'calc(30% - 15px)' }}>
              <div
                className={clsx('header', {
                  ew: epilepsyWarning
                })}
              >
                Song
              </div>
              <div className="value">{song}</div>
            </div>
            <div className="section" style={{ width: 'calc(20% - 10px)' }}>
              <div className="header">Artist</div>
              <div className="value">{artists.join(' & ')}</div>
            </div>
            <div className="section" style={{ width: '50%' }}>
              <div className="header">Tags</div>
              <div className="value">
                {tags.length !== 0
                  ? (tags as any[]).map((tag, i) => (
                      <LevelTags
                        tag={tag.id}
                        id={id}
                        key={i}
                        styleClass="main-tag"
                      />
                    ))
                  : tags.length === 0 && (
                      <img
                        className="main-tag"
                        src={require('@assets/tag/empty.svg').default.src}
                        alt="No Tags"
                      />
                    )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Link>
  )
}

export default LevelListItem
