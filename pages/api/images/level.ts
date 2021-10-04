import { Canvas, Image, loadImage } from 'canvas'
import * as yup from 'yup'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const levelSchema = yup.object().shape({
  thumbnail: yup.string().required(),
  difficulty: yup.number().required()
})

let logo: Image | null = null

const assetsDir = path.join(__dirname, '../../../../../assets')

const difficultyIconCache = new Map<number, Image>()

async function getLogo() {
  if (logo) return logo
  logo = await loadImage(path.join(assetsDir, 'icon.png'))
  return logo
}

async function getDifficultyIcon(lvl: number) {
  const get = difficultyIconCache.get(lvl)
  if (get) return get
  try {
    const img = await loadImage(
      path.join(assetsDir, 'difficulty_icons', `${lvl}.svg`)
    )
    difficultyIconCache.set(lvl, img)
    return img
  } catch (e: any) {
    return null
  }
}

const level = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await levelSchema.validate(req.query)

    const width = 1280
    const height = 720

    const canvas = new Canvas(width, height)

    const ctx = canvas.getContext('2d')

    const background = await loadImage(data.thumbnail)

    const lvlIcon = await getDifficultyIcon(data.difficulty)

    if (!lvlIcon) {
      return res.status(400).json({ error: 'Unknown difficulty' })
    }

    ctx.drawImage(background, 0, 0, 1280, 720)

    ctx.drawImage(lvlIcon, 20, height - 20 - 120, 120, 120)
    ctx.drawImage(await getLogo(), width - 20 - 70, 20, 70, 70)

    res.setHeader('Content-Type', 'image/png')

    res.status(200).send(canvas.toBuffer())
  } catch (e) {
    res.status(500).json(e)
  }
}

export default level
