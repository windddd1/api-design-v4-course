import prisma from "../config/db";

// Get all
export const getListPost = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      posts: true,
    },
  });

  res.json({ data: user.posts });
};

// Get one
export const getDetailPost = async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
    include: {
      belongsTo: {
        select: {
          fullname: true,
          avatar: true,
          birthday: true
        }
      },
    }
  })

  res.json({ data: post });
};

// Create one
export const createPost = async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        userId: req.user.id,
      },
    });
    res.json({ data: post });
  } catch (e) {
    next(e);
  }
};

// Update one
export const updatePost = async (req, res, next) => {
  try {
    const updated = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });

    res.json({ data: updated });
  } catch (e) {
    next(e);
  }
};

// Delete one
export const deletePost = async (req, res, next) => {
  try {
    const deleted = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: deleted });
  } catch (e) {
    next(e);
  }
};
