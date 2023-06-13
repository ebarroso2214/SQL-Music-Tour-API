const stages = require('express').Router();
const db = require('../models');
const { Stage, Event, StageEvent } = db;
const { Op } = require('sequelize');

//! CREATE
stages.post('/', async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({
      message: 'Created a new stage',
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! READ
stages.get('/', async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
      offset: req.query.page ? (req.query.page-1) * 10 : 0,
      limit: 10,
      where: {
        stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
      },
    });
    res.status(200).json(foundStages);
  } catch (error) {
    res.status(500).json(error);
  }
});
stages.get('/:name', async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_name: req.params.name },
      include: {
        model: Event,
        required: false,
        as: 'events',
        attributes: ['name', 'date'],
        through: { attributes: [] },
      }
    });
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//! UPDATE
stages.put('/:id', async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`,
      data: updatedStages
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! DELETE
stages.delete('/:id', async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = stages;