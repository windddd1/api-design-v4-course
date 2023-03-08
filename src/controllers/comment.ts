import prisma from "../config/db";

export const createCommentPost = async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        authorId: req.user.id,
        postId: req.params.postId
      },
    });
    res.json({ data: comment });
  } catch (e) {
    next(e);
  }
};

export const getListCommentPost = async (req, res) => {
  const listComment = await prisma.comment.findMany({
    where: {
      postId: req.params.postId,
    },
    include: {
      author: {
        select: {
          fullname: true,
          avatar: true
        }
      },
    },
  });


  res.json({ data: listComment });
};

export const deleteCommentPost = async (req, res) => {
  const listComment = await prisma.comment.findMany({
    where: {
      postId: req.params.postId,
    },
    include: {
      author: {
        select: {
          fullname: true,
          avatar: true
        }
      },
    },
  });


  res.json({ data: listComment });
};

export const updateCommentPost = async (req, res) => {
  const listComment = await prisma.comment.findMany({
    where: {
      postId: req.params.postId,
    },
    include: {
      author: {
        select: {
          fullname: true,
          avatar: true
        }
      },
    },
  });


  res.json({ data: listComment });
};
