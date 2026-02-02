import React from 'react'

export const normalizeMongoImage = (photo) => ({
  id: photo.id,
  urls: {
    regular: photo.regular,
  },
  user: {
    username: photo.username,
    profile_image: {
      medium: photo.profile_picture,
    },
  },
});
