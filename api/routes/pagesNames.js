const router = require("express").Router();
const PagesController = require('../controllers/pagesNames')

router.post('/createpagename', PagesController.createPageName);
router.post('/getName', PagesController.getName);
router.get('/getallnamesclicked', PagesController.getAllNamesClicked);
router.post('/changestatus', PagesController.changeStatus);
router.post('/generatedynamiclink', PagesController.generateDynamicLink);

module.exports = router;