// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, SetTime, Event } = db;
const { Op } = require('sequelize')

// FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll({
          offset: req.query.page ? (req.query.page - 1) * 10: 0 ,
          limit: 10,
          order: [ [ 'available_start_time', 'ASC' ] ],
          where: {
            name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
          }
      })
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})

// FIND A SPECIFIC BAND
//show route
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [
                {
                model: MeetGreet,
                as: "meet_greets",
                include: {
                    model: Event,
                    as: "event",
                    required: false,
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                }
            },
            {
                model: SetTime,
                as: "set_times",
                include: {
                    model: Event,
                    as: "event",
                    required: false,
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                }
            }
        ],
        order: [
            ["meet_greets", "event", "date", "ASC"],
            ["set_times", "event", "date", "ASC"]
        ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
    })

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      res.status(200).json({
        message: 'Successfully inserted a new band',
        data: newBand
      })
  } catch(err) {
      res.status(500).json(err)
  }
})




// UPDATE A BAND
bands.put('/:id', async (req, res) => {
  try {
      const updatedBands = await Band.update(req.body, {
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
  try {
      const deletedBands = await Band.destroy({
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

module.exports = bands