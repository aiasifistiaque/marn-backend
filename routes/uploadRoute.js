import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

/**Swagger doc
 * completed
 * version 0.2
 * 18/07/21 03:40
 * total routes: 01
 * root: /api/upload/
 * note: to be checked further
 */

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req, res) => {
	console.log(req.body);
	res.status(200).send(`/${req.file.path}`);
});

export default router;

/**
 * Route #4
 * @swagger
 * /upload:
 *   post:
 *     description: Upload a picture to server
 *     parameters:
 *       - name: file
 *         description: picture file
 *         in: req.file.path
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: returns String - path/url of file
 */
