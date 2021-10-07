import React from 'react'
import { MainSectionTitle } from './RecentLevels'
import styled from 'styled-components'
import speedTrial from '@assets/other_icons/speed.svg'
import accuracy from '@assets/other_icons/accuracy.svg'

const Container = styled.section`
  width: 100%;
  max-width: 1100px;
  .content {
    margin-top: 10px;
    display: flex;
    gap: 30px;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
    & > a {
      width: 100%;
      & > div {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        & > div {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: solid 3px transparent;
          overflow: hidden;
          border-radius: 8px;
          transition: all 0.2s ease-in-out;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          &:hover {
            transform: scale(1.05);
            &::before {
              filter: blur(1px) brightness(0.5);
            }
          }
          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: var(--play-background);
            z-index: -1;
            background-size: cover;
            background-position: center;
            filter: blur(2px) brightness(0.4);
            transition: all 0.2s ease-in-out;
          }
          .pp {
            padding: 10px 30px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 0 8px 8px;
            backdrop-filter: blur(2px);
          }
          .title-area {
            display: flex;
            flex-direction: column;
            gap: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #fff;
            font-weight: 500;
            text-align: center;
            .title {
              font-size: 20px;
            }
            .player {
              font-size: 18px;
            }
          }
          .details {
            margin-bottom: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: flex;
            gap: 20px;
            font-weight: 700;
            font-size: 15px;
            & > div {
              display: flex;
              gap: 5px;

              & > img {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }
`

const difficultyColorDict: { [K: number]: React.CSSProperties } = {
  0: { borderColor: '#A4A4A4' },
  1: { borderColor: '#0099FF' },
  2: { borderColor: '#AEAFAD' },
  3: { borderColor: '#00DDFF' },
  4: { borderColor: '#00FFFF' },
  5: { borderColor: '#00FFAA' },
  6: { borderColor: '#00FF00' },
  7: { borderColor: '#66FF00' },
  8: { borderColor: '#99FF00' },
  9: { borderColor: '#CCFF00' },
  10: { borderColor: '#FFFF00' },
  11: { borderColor: '#FFDD00' },
  12: { borderColor: '#FFCC00' },
  13: { borderColor: '#FFAA00' },
  14: { borderColor: '#FF8800' },
  15: { borderColor: '#FF6600' },
  16: { borderColor: '#FF4400' },
  17: { borderColor: '#FF0000' },
  18: { borderColor: '#CC0000' },
  18.5: { borderColor: '#A61C00' },
  19: { borderColor: '#660000' },
  19.5: { borderColor: '#460C00' },
  20: { borderColor: '#000000' },
  20.5: {
    backgroundImage:
      'linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(255,0,0,1) 100%)',
    backgroundColor: 'black',
    backgroundOrigin: 'border-box'
  },
  21: { borderColor: '#4C1130' }
}

const TopPlays: React.FC<{ topPlays: any[] }> = ({ topPlays }) => {
  return (
    <Container>
      <MainSectionTitle>
        <h1>Top Plays</h1>
      </MainSectionTitle>
      <div className="content">
        {topPlays.map((x, i) => {
          const videoId =
            /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
              x.url
            )![1]
          return (
            <a
              href={x.url}
              target="_blank"
              rel="noreferrer"
              style={{
                // @ts-ignore
                '--play-background': `url(${
                  'https://i3.ytimg.com/vi/' + videoId + '/0.jpg'
                })`
              }}
              key={i}
            >
              <div>
                <div style={difficultyColorDict[x.difficulty]}>
                  <div className="pp">{x.playPoint.toFixed(0)} PP</div>
                  <div className="title-area">
                    <div className="title">{x.level.name}</div>
                    <div className="player">{x.player.name}</div>
                  </div>
                  <div className="details">
                    <div>
                      <img src={speedTrial.src} alt="Speed Trial: " />
                      <span>{x.speed / 100}x</span>
                    </div>
                    <div>
                      <img src={accuracy.src} alt="Accuracy: " />
                      <span>
                        {x.rawAccuracy
                          ? `${x.rawAccuracy.toFixed(2)}%`
                          : 'UNKNOWN'}
                      </span>
                    </div>
                    <div>
                      <span>Lv. {String(x.difficulty).replace('.5', '+')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </Container>
  )
}

export default TopPlays
