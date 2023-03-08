import {
  createCommentPost,
  deleteCommentPost,
  getListCommentPost,
  updateCommentPost,
} from "./../controllers/comment";
import { Router } from "express";
import {
  getListPost,
  getDetailPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";
import {
  validateBody,
  validateParam,
} from "../middlewares/validate.middleware";
import { schemas } from "../validation/index";
const router = Router();

/**
 * Post
 */
router.get("/", getListPost);
router.post("", validateBody(schemas.postSchema), createPost);
router.get("/:id", validateParam(schemas.idSchema, "id"), getDetailPost);
router.put(
  "/:id",
  validateParam(schemas.idSchema, "id"),
  validateBody(schemas.postSchema),
  updatePost
);
router.delete("/:id", validateParam(schemas.idSchema, "id"), deletePost);

router.get(
  "/:postId/comment",
  validateParam(schemas.idSchema, "postId"),
  getListCommentPost
);
router.post(
  "/:postId/comment",
  validateParam(schemas.idSchema, "postId"),
  validateBody(schemas.commentSchema),
  createCommentPost
);
router.put(
  "/:postId/comment/:commentId",
  validateParam(schemas.idSchema, "postId"),
  validateParam(schemas.idSchema, "commentId"),
  updateCommentPost
);
router.delete(
  "/:postId/comment/:commentId",
  validateParam(schemas.idSchema, "postId"),
  validateParam(schemas.idSchema, "commentId"),
  validateBody(schemas.commentSchema),
  deleteCommentPost
);

export default router;
