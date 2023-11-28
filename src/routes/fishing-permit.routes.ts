import express from 'express'
import fishingPermitController from '../fishing-permit/fishing-permit.controller'
const router = express.Router()


router.get('/get-all', fishingPermitController.getAll)
router.get('/get-by-id', fishingPermitController.getById)
router.get('/get-my-permits', fishingPermitController.findMyPermits)
router.post('/create', fishingPermitController.createPermit)
router.post('/add-catch-to-permit', fishingPermitController.addCatchToFishingPermit)


export = router