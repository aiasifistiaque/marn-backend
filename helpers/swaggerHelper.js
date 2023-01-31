/**
 * @swagger
 * /register:
 *   post:
 *     description: Sign up/Register a new user
 *     parameters:
 *       - name: name
 *         description: Get products of a category/sub category/tag
 *         in: req body
 *         required: true
 *         type: string
 *       - name: email
 *         in: req body
 *         required: true
 *         type: string
 *       - name: password
 *         in: req body
 *         required: true
 *         type: string
 *     responses:
 *       400:
 *         description: String - error message
 *       200:
 *         description: returns {user} and token in header
 */
