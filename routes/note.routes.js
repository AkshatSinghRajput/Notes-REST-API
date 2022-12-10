const noteRouter = require("express").Router();
const { body } = require("express-validator");
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
//Schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Note:
 *      type: object
 *      required:
 *        - title
 *        - body
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated Id of the Note
 *        title:
 *          type: string
 *          description: The title of the note
 *        body:
 *          type: string
 *          description: Body of the note
 *        Date:
 *          type: Date
 *          description: Date of creation of note
 *      example:
 *        title: This is a title
 *        body: This is a body
 */

//Tags
/**
 * @swagger
 * tags:
 *   name: Note
 *   description: This manages the notes
 */

//Routes
/** *
 * @swagger
 * /notes:
 *   get:
 *      summary: Get all the notes of the user
 *      description: Use to get all notes of the user
 *      security:
 *        - bearerAuth: []
 *      tags: [Note]
 *      parameters:
 *        - name: auth-token
 *          in: header
 *          description: an Authorization header
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '401':
 *            description: Unauthorized Access!
 *        '429':
 *            description: Api limit Exceeded!
 *        '404':
 *            description: No notes found!
 *        '500':
 *            description: Server Error
 */

noteRouter.get("/", getNotes);
/** *
 * @swagger
 * /notes/{id}:
 *   get:
 *      summary: Get a note by it's ID
 *      description: Use to get a note by it's ID
 *      security:
 *        - bearerAuth: []
 *      tags: [Note]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Id of the note
 *          required: true
 *          type: string
 *        - name: auth-token
 *          in: header
 *          description: an Authorization header
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '401':
 *            description: Unauthorized Access!
 *        '429':
 *            description: Api limit Exceeded!
 *        '404':
 *            description: No note found!
 *        '500':
 *            description: Server Error
 */
noteRouter.get("/:id", getNote);
/** *
 * @swagger
 * /notes/createnote:
 *   post:
 *      summary: Create a new note
 *      description: Use to create a new note
 *      security:
 *        - bearerAuth: []
 *      tags: [Note]
 *      parameters:
 *        - name: auth-token
 *          in: header
 *          description: an Authorization header
 *          required: true
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '401':
 *            description: Unauthorized Access!
 *        '429':
 *            description: Api limit Exceeded!
 *        '500':
 *            description: Server Error
 */
noteRouter.post(
  "/createnote",
  [
    body(
      "title",
      "Title cannot be empty or greater than 15 characters"
    ).isLength({ min: 1, max: 15 }),
    body("body", "Body cannot be empty or greater than 50 characters").isLength(
      { min: 1, max: 50 }
    ),
  ],
  createNote
);
/** *
 * @swagger
 * /notes/updateNote/{id}:
 *   put:
 *      summary: Update a note with it's Id
 *      description: Use to update a note by it's ID
 *      security:
 *        - bearerAuth: []
 *      tags: [Note]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Id of the note
 *          required: true
 *          type: string
 *        - name: auth-token
 *          in: header
 *          description: an Authorization header
 *          required: true
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Note'
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '401':
 *            description: Unauthorized Access!
 *        '404':
 *            description: Note not found!
 *        '429':
 *            description: Api limit Exceeded!
 *        '500':
 *            description: Server Error
 */
noteRouter.put("/updateNote/:id", updateNote);
/** *
 * @swagger
 * /notes/deleteNote/{id}:
 *   delete:
 *      summary: Delete a note with it's Id
 *      description: Use to delete a note by it's ID
 *      security:
 *        - bearerAuth: []
 *      tags: [Note]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Id of the note
 *          required: true
 *          type: string
 *        - name: auth-token
 *          in: header
 *          description: an Authorization header
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *            description: A Succesful Response
 *        '401':
 *            description: Unauthorized Access!
 *        '404':
 *            description: Note not found!
 *        '429':
 *            description: Api limit Exceeded!
 *        '500':
 *            description: Server Error
 */
noteRouter.delete("/deleteNote/:id", deleteNote);

module.exports = noteRouter;
