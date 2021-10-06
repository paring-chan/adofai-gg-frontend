import React from 'react'
import { NextPage } from 'next'
import { Level } from '../../../typings/Level'
import { api } from '../../../utils/request'
import Head from 'next/head'
import Content from '../../../components/layout/Content'
import styled from 'styled-components'
import censored from '@assets/levelBackgrounds/censored_level.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import LevelTags from '../../../components/levels/LevelTags'
import AlertButton from '../../../components/AlertButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import Router from 'next/router'
import LikeButton from '../../../components/LikeButton'
import SpeedTrial from '@assets/other_icons/speed.svg'
import AccuracyIcon from '@assets/other_icons/speed.svg'

const ExtendedContent = styled(Content)`
  margin-left: 10px;
  margin-right: 10px;
`

const Header = styled.div`
  background-color: #0f172163;
  width: 100%;
  margin-top: 30px;
  border-radius: 20px;
  overflow: hidden;
`

const LevelInfoTag = styled.div`
  border-radius: 100em;
  background-color: #f2f2f2;
  padding: 3px 8px 3px 5px;
  white-space: nowrap;
  text-shadow: 0 0 0;

  &::before {
    content: '#';
    height: 20px;
    width: 20px;
    margin-right: 5px;
    border-radius: 100em;
    background-color: #dfdfdf;
    display: inline-block;
    text-align: center;
  }
`

const WarnTag = styled(LevelInfoTag)`
  overflow: hidden;
  background-color: #ff4646;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  &::before {
    content: '!';
    background-color: #8b3030;
    color: #fff;
  }
`

const WarnTag2 = styled(WarnTag)`
  cursor: revert;
`

const IncompleteTag = styled(WarnTag2)`
  &::after {
    content: 'Incomplete!';
  }
`

const SeizureTag = styled(WarnTag)`
  &::after {
    content: 'Seizure Warning';
  }
`

const CensoredTag = styled(WarnTag2)`
  &::before {
    content: 'X';
  }
  &::after {
    content: 'Censored';
  }
`

const NSFWTag = styled(WarnTag2)`
  &::before {
    content: '18';
  }
  &::after {
    content: 'NSFW';
  }
`

const InfoHeader = styled.div<{ background: string }>`
  width: 100%;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    display: block;
    background-size: 100% auto;
    background-position: center;
    background-image: url('${({ background }) => background}');
    filter: brightness(0.7);
  }
  z-index: 0;
  display: flex;
  padding: 18px 23px 15px;

  .content {
    flex-grow: 1;
    text-shadow: black 0 0 8px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .title {
      color: #fff;
      font-weight: 700;
      font-size: 40px;
    }

    .song {
      color: rgba(255, 255, 255, 0.8);
      font-size: 16px;
      overflow: hidden;
    }

    .author {
      margin-top: 5px;
      display: inline-block;
      color: #fff;
      font-size: 20px;
      overflow: hidden;
    }

    .tags {
      display: flex;
      gap: 5px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .buttons {
    display: flex;
    gap: 20px;

    .button {
      svg {
        width: 50px;
        height: 50px;
        transition: all 0.2s ease;
        filter: drop-shadow(0 0 10px rgb(0 0 0));
        &:hover {
          transform: scale(0.9);
        }
      }
    }
  }
`

const Description = styled.div`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  gap: 10px;
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .items {
      display: flex;
      gap: 25px;
      .item {
        .label {
          font-size: 18px;
          color: #b3b3b3;
          font-weight: 600;
        }
        .value {
          color: #fff;
          font-size: 32px;
          display: flex;
          .demical {
            font-size: 16px;
          }
          &.description {
            line-height: 1.25em;
            font-size: 28px !important;
          }
        }
      }
    }
  }
  .video {
    max-width: 40%;
    width: 100%;
    .video-content {
      width: 100%;
      border-radius: 10px;
      background-color: #0f172163;
      position: relative;
      align-items: center;
      padding-bottom: 56.25%;
      iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    .video {
      max-width: 100% !important;
    }
  }
`

const LeaderboardContainer = styled.section`
  margin-top: 40px;
  width: 100%;

  .title {
    display: flex;
  }

  .content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 7.5px;

    .item {
      height: 80px;
      display: flex;
      align-items: center;
      background-color: #fafbff1f;
      border-radius: 10px;
      transition: all 0.2s ease;

      &:hover {
        background-color: #33416199;
        text-decoration: none;
      }

      .rank {
        width: 110px;
        height: 100%;
        padding: 20px 18px;
        margin-right: 20px;
        font-size: 1.75em;
        font-weight: 700;
        font-family: 'Roboto Mono', 'Quicksand', monospace;
        background-color: #b2c1ff23;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }

      .item-content {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;

        .name {
          font-size: 1.5em;
          font-weight: 500;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .detail {
          flex-grow: 1;
          font-size: 1.1em;
          opacity: 0.8;
          .play {
            display: flex;
            .pp {
              width: 180px;
              @media screen and (max-width: 768px) {
                width: 100px;
              }
              font-weight: 600;
              &::after {
                content: 'PP';
                font-weight: 400;
                margin-left: 5px;
              }
            }
            .play-info {
              display: flex;
              align-items: center;
              div {
                display: flex;
                align-items: center;
              }
              img {
                margin-right: 4px;
              }
            }
          }
        }
      }

      * {
        transition: all 0.2s ease;
      }
    }
  }
`

const NSFWAlert: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close
}) => {
  return (
    <Dialog
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(30px) brightness(0.5)'
        }
      }}
      open={open}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This level contains <strong>NSFW content</strong>.
          <br />
          <br />
          If you are a minor or don{"'"}t want to see a level with sexual
          content, please{' '}
          <strong>press Cancel and do NOT play this level</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => Router.push('/')}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={close} color="error">
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const LevelInfo: NextPage<{ level: Level | null; leaderboard: any[] | null }> =
  ({ level, leaderboard }) => {
    const thumbnail = level?.video
      ? 'https://i.ytimg.com/vi/' + level.youtubeId + '/original.jpg'
      : ''

    const [showNSFW, setShowNSFW] = React.useState(false)

    React.useEffect(() => {
      if (level?.hasNSFW) {
        setShowNSFW(true)
      }
      // eslint-disable-next-line
    }, [])

    const getDifficultyIcon = () => {
      try {
        return require(`@assets/difficulty_icons/${
          level?.censored ? '-2' : level?.difficulty
        }.svg`).default.src
      } catch (e: any) {
        return ''
      }
    }

    return (
      <div>
        <NSFWAlert open={showNSFW} close={() => setShowNSFW(false)} />
        {level ? (
          <div>
            <Head>
              <title>
                {level.artists.join(' & ')} - {level.title}
              </title>
              <meta
                key="description"
                name="og:description"
                content={`by ${level.creators.join(' & ')}`}
              />
              <meta
                key="image"
                property="og:image"
                content={`${
                  process.env.openGraphBaseURL
                }/api/level?thumbnail=${encodeURIComponent(
                  thumbnail
                )}&difficulty=${level.difficulty}`}
              />
              <meta property="og:image:width" content="1280" />
              <meta property="og:image:height" content="720" />
              <meta property="og:site_name" content="Adofai.gg" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content={`${level.artists.join(' & ')} - ${level.title}`}
              />
            </Head>
            <ExtendedContent>
              <Header>
                <InfoHeader
                  background={level.censored ? censored.src : thumbnail}
                >
                  <div className="content">
                    <div>
                      <div className="title">{level.title}</div>
                      <div className="song">{level.song}</div>
                      <div className="author">
                        <strong>
                          {level.artists.map((x, i) => (
                            <span key={i}>
                              {i > 0 && <span> & </span>}
                              <Link
                                href={`/levels?query=${encodeURIComponent(x)}`}
                                passHref
                              >
                                <a>{x}</a>
                              </Link>
                            </span>
                          ))}
                        </strong>
                        {' ─ Level by '}
                        <strong>
                          {level.creators.map((x, i) => (
                            <span key={i}>
                              {i > 0 && <span> & </span>}
                              <Link
                                href={`/levels?query=${encodeURIComponent(x)}`}
                                passHref
                              >
                                <a>{x}</a>
                              </Link>
                            </span>
                          ))}
                        </strong>
                      </div>
                    </div>
                    <div className="tags">
                      {!level.censored && level.difficulty === 0 && (
                        <IncompleteTag />
                      )}
                      {level.censored && <CensoredTag />}
                      {level.hasNSFW && <NSFWTag />}
                      {level.epilepsyWarning && (
                        <AlertButton
                          button={({ open }) => <SeizureTag onClick={open} />}
                        >
                          {({ close }) => (
                            <>
                              <DialogTitle>
                                What is Photosensitive Seizure?
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Some people may experience seizures when
                                  exposed to certain visual effects, such as{' '}
                                  <strong>severely flashing lights</strong>{' '}
                                  during the game. These symptoms are called
                                  &quot;photosensitive seizures&quot;.
                                  <br />
                                  <br />
                                  Photosensitive seizures can occur even to
                                  those who have never experienced seizures
                                  before.
                                  <br />
                                  <br />
                                  When seizures begin, symptoms such as
                                  dizziness, changes in vision, eye or face
                                  cramps, twitching or shaking arms or legs,
                                  disorientation, panic, and, in severe cases,
                                  temporary loss of consciousness can occur.
                                  <br />
                                  <br />
                                  <strong>
                                    If symptoms occur, immediately turn off the
                                    game and talk to your doctor.
                                  </strong>
                                  <br />
                                  <br />
                                  To reduce the risk of seizures, follow these
                                  steps.
                                  <br />- Play this level in a bright place
                                  <br />- Avoid playing this level when you are
                                  tired
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  onClick={close}
                                >
                                  Close
                                </Button>
                              </DialogActions>
                            </>
                          )}
                        </AlertButton>
                      )}
                      {level.tags.length !== 0
                        ? // eslint-disable-next-line array-callback-return
                          level.tags.map((tag, i) => {
                            if (tag.id !== 23)
                              return (
                                <LevelTags
                                  key={i}
                                  tag={tag.id}
                                  id={`${level.id}`}
                                  styleClass="level-tag-icon"
                                />
                              )
                          })
                        : !level.epilepsyWarning &&
                          !level.censored &&
                          !level.hasNSFW && (
                            <img
                              className="main-tag"
                              src={require('@assets/tag/empty.svg').default.src}
                              alt="No Tags"
                            />
                          )}
                    </div>
                  </div>
                  <div className="buttons">
                    {level.workshop && (
                      <a
                        href={level.workshop}
                        target="_blank"
                        rel="noreferrer"
                        className="button"
                      >
                        <FontAwesomeIcon icon={faSteam} />
                      </a>
                    )}
                    <a
                      href={level.download}
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </div>
                </InfoHeader>
                <Description>
                  <div className="content">
                    <div className="items">
                      <div className="item">
                        <div className="label" style={{ textAlign: 'center' }}>
                          Lv.
                        </div>
                        <div className="value">
                          <img
                            src={getDifficultyIcon()}
                            alt=""
                            style={{
                              width: 32,
                              height: 32
                            }}
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="label">BPM</div>
                        <div className="value">
                          {String(level.minBpm).split('.')[0]}
                          <span className="demical">
                            {String(level.minBpm).split('.')[1] === undefined
                              ? null
                              : `.${String(level.minBpm).split('.')[1]}`}
                          </span>
                        </div>
                      </div>
                      <div className="item">
                        <div className="label">Tiles</div>
                        <div className="value">{level.tiles}</div>
                      </div>
                    </div>
                    <div className="items">
                      <div className="item">
                        <div className="label">Description</div>
                        <div className="value description">
                          {!level.description
                            ? `There's no description for this level.`
                            : level.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }} />
                    <div>
                      <LikeButton likes={level.likes} />
                    </div>
                  </div>
                  <div className="video">
                    <div className="video-content">
                      <iframe
                        src={`https://www.youtube.com/embed/${level.youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      />
                    </div>
                  </div>
                </Description>
              </Header>
              {leaderboard?.length && (
                <LeaderboardContainer>
                  <h1 className="title">Leaderboard</h1>
                  <div className="content">
                    {leaderboard.map((x, i) => (
                      <a
                        href={x.url}
                        key={i}
                        target="_blank"
                        rel="noreferrer"
                        className="item"
                        style={{ color: '#fff' }}
                      >
                        <span className="rank">#{i + 1}</span>
                        <div className="item-content">
                          <span className="name">{x.player.name}</span>
                          <div className="detail">
                            <div className="play">
                              <div className="pp">{x.playPoint.toFixed(0)}</div>
                              <div className="play-info">
                                <div style={{ minWidth: '4em' }}>
                                  <img
                                    src={SpeedTrial.src}
                                    alt="Speed Trial: "
                                    style={{
                                      height: '0.9em'
                                    }}
                                  />
                                  {x.speed / 100}x
                                </div>
                                <div>
                                  <img
                                    src={AccuracyIcon.src}
                                    alt="Accurancy: "
                                    style={{
                                      height: '0.9em'
                                    }}
                                  />
                                  {x.rawAccuracy
                                    ? `${x.rawAccuracy.toFixed(1)}%`
                                    : 'UNKNOWN'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </LeaderboardContainer>
              )}
            </ExtendedContent>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

LevelInfo.getInitialProps = async (ctx) => {
  try {
    const { data: levelData } = await api
      .get(`/api/v1/levels/${ctx.query.id}`)
      .catch(() => ({} as any))
    const { data: leaderboardData } = await api
      .get(`/api/v1/playLogs`, {
        params: {
          offset: 0,
          amount: 10,
          levelId: ctx.query.id,
          sort: 'PP_DESC'
        }
      })
      .catch(() => ({} as any))
    if (!levelData)
      return {
        level: null,
        leaderboard: null
      }

    let level: Level = levelData

    level.hasNSFW = level.tags.some((tag) => tag.id === 23)

    level.youtubeId =
      /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
        level.video
      )![1]

    return { level, leaderboard: leaderboardData?.results || [] }
  } catch (e: any) {
    return { level: null, leaderboard: null }
  }
}

export default LevelInfo
