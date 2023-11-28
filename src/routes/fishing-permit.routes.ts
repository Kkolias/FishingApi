import express from 'express'
import fishingPermitController from '../fishing-permit/fishing-permit.controller'
const router = express.Router()


router.get('/get-all', fishingPermitController.getAll)
router.get('/get-by-id', fishingPermitController.getById)
router.post('/create', fishingPermitController.createPermit)


export = router