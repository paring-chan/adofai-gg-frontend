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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

const ExtendedContent = styled(Content)`
  background-color: #0f172163;
  margin-top: 30px;
  border-radius: 20px;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
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
`

const LevelInfo: NextPage<{ level: Level | null }> = ({ level }) => {
  const thumbnail = level?.video
    ? 'https://i.ytimg.com/vi/' + level.youtubeId + '/original.jpg'
    : ''

  React.useEffect(() => {
    if (level?.hasNSFW) {
      alert('nsfw warning')
    }
  })

  return (
    <div>
      {level ? (
        <>
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
              content={`/api/images/level?thumbnail=${encodeURIComponent(
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
            <InfoHeader background={level.censored ? censored.src : thumbnail}>
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
                              Some people may experience seizures when exposed
                              to certain visual effects, such as{' '}
                              <strong>severely flashing lights</strong> during
                              the game. These symptoms are called
                              &quot;photosensitive seizures&quot;.
                              <br />
                              <br />
                              Photosensitive seizures can occur even to those
                              who have never experienced seizures before.
                              <br />
                              <br />
                              When seizures begin, symptoms such as dizziness,
                              changes in vision, eye or face cramps, twitching
                              or shaking arms or legs, disorientation, panic,
                              and, in severe cases, temporary loss of
                              consciousness can occur.
                              <br />
                              <br />
                              <strong>
                                If symptoms occur, immediately turn off the game
                                and talk to your doctor.
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
            <Description />
          </ExtendedContent>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

LevelInfo.getInitialProps = async (ctx) => {
  const { data } = await api
    .get(`/api/v1/levels/${ctx.query.id}`)
    .catch(() => ({} as any))
  if (!data)
    return {
      level: null
    }

  let level: Level = data

  level.hasNSFW = level.tags.some((tag) => tag.id === 23)

  level.youtubeId =
    /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
      level.video
    )![1]

  return { level }
}

export default LevelInfo
