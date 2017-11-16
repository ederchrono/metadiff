import { Router } from 'express'
import Metascraper from 'metascraper'

const router = Router()

/* GET users listing. */
router.get('/metadata', async function (req, res, next) {
  const url = req.query.url || ''
  let response = {}
  Metascraper.scrapeUrl(url, specialRules)
    .then(
      (metadata) => {
        response = metadata
      },
      (error) => {
        console.log(error)
      })
    .finally(() => {
      res.json(response.metatags)
    })
})

const specialRules = {
  'metatags': $ => {
    const data = $('meta')
      .filter((i, tag) => {
        if (tag.parent && tag.parent.name) {
          return tag.parent.name === 'head'
        }
        return false
      })
      .map((i, tag) => {
        let obj = {}
        for (var key in tag.attribs) {
          if (key !== 'data-n-head' && key !== 'data-hid' && key !== 'hid') {
            obj[key] = tag.attribs[key]
          }
        }
        return obj
      }).get()

    let namedMeta = {}
    data.filter(item => item.name).forEach(item => {
      namedMeta['name__' + item.name] = JSON.stringify(item)
    })

    data.filter(item => item.property).forEach(item => {
      namedMeta['property__' + item.property] = JSON.stringify(item)
    })

    data.filter(item => item['http-equiv']).forEach(item => {
      namedMeta['http-equiv__' + item['http-equiv']] = JSON.stringify(item)
    })

    const unnamedMeta = data
      .filter(item => !item.name && !item.property && !item['http-equiv'])
      .map(item => JSON.stringify(item))

    return { namedData: namedMeta, unnamedData: unnamedMeta, count: data.length, originalData: data }
  }
}

export default router
