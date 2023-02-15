import prisma from "../db"

// Get all
export const getListPost = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    include: {
      posts: true
    }
  })

  res.json({data: user.posts})
}

// Get one
export const getDetailPost = async (req, res) => {
  const id = req.params.id

  const post = await prisma.post.findFirst({
    where: {
      id,
      userId: req.user.id
    }
  })

  res.json({data: post})
}

// Create one
export const createPost = async (req, res) => {
  // const post = await prisma.post.create({
  //   data: {
  //     name: req.body.name,
  //     userId: req.user.id
  //   }
  // })

  // res.json({data: post})
   res.json({})
}


// Update one
export const updatePost = async (req, res) => {
  // const updated = await prisma.post.update({
  //   where: {
  //     id: req.params.id,
  //   },
  //   data: {
  //     name: req.body.name
  //   }
  // })

  // res.json({data: updated})
  res.json({})
}

// Delete one
export const deletePost = async (req, res) => {
  const deleted = await prisma.post.delete({
    where: {
      id: req.params.id,
    }
  })

  res.json({data: deleted})
}