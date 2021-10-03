import { Canvas, Image, loadImage, registerFont } from 'canvas'
import * as yup from 'yup'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import axios from 'axios'

const levelSchema = yup.object().shape({
  id: yup.string().required()
})

let logo: Image | null = null

const assetsDir = path.join(__dirname, '../../../../../public')

const difficultyIconCache = new Map<number, Image>()

async function getLogo() {
  if (logo) return logo
  logo = await loadImage(path.join(assetsDir, 'logo.png'))
  return logo
}

async function getDifficultyIcon(lvl: number) {
  const get = difficultyIconCache.get(lvl)
  if (get) return get
  const img = await loadImage(
    path.join(assetsDir, 'difficulty_icons', `${lvl}.svg`)
  )
  difficultyIconCache.set(lvl, img)
  return img
}

const level = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await levelSchema.validate(req.query)

    const level = (
      await axios.get('https://api.adofai.gg:9200/api/v1/levels/' + data.id)
    ).data as any

    const thumbnail =
      'https://i.ytimg.com/vi/' +
      /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/.exec(
        level.video
      )![1] +
      '/original.jpg'

    const canvas = new Canvas(1280, 720)

    await registerFont('fonts/NanumSquareRoundOTFEB.otf', {
      family: 'NanumSquareRound',
      weight: 'normal'
    })

    const ctx = canvas.getContext('2d')

    ctx.font = "40px 'NanumSquareRound'"

    const background = await loadImage(thumbnail)

    const lvlIcon = await getDifficultyIcon(level.difficulty)

    ctx.drawImage(background, 0, 0, 1280, 720)

    ctx.fillStyle = '#ffffff'

    const contentBaseY = 520

    ctx.fillRect(0, contentBaseY, 1280, 200)

    ctx.fillStyle = '#000000'

    ctx.drawImage(await getLogo(), 1190, contentBaseY + 20, 70, 70)

    ctx.drawImage(lvlIcon, 20, contentBaseY + 20, 70, 70)

    ctx.fillText(
      level.title.length > 45 ? level.title.slice(0, 45) + '...' : level.title,
      110,
      contentBaseY + 55
    )

    ctx.font = "25px 'NanumSquareRound'"

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'

    ctx.fillText(
      level.title.length > 70 ? level.title.slice(0, 70) + '...' : level.title,
      110,
      contentBaseY + 85
    )

    ctx.fillStyle = '#000'

    ctx.font = "40px 'NanumSquareRound'"

    ctx.fillText('Song by ' + level.artists.join(' & '), 20, contentBaseY + 135)

    ctx.fillText(
      'Level by ' + level.creators.join(' & '),
      20,
      contentBaseY + 180
    )

    res.setHeader('Content-Type', 'image/png')

    res.status(200).send(canvas.toBuffer())
  } catch (e) {
    res.status(500).json(e)
  }
}

export default level
