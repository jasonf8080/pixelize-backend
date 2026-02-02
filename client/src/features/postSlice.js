import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


  export const getAllPosts = createAsyncThunk("posts/getAllPosts", async(_, thunkAPI) => {
    try {
        const res = await fetch("/api/post/getAllPosts", {
            method: "GET",
            credentials: "include", // send cookies (JWT)
        });

        const data = await res.json();
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message)
    }
  })

  export const submitPost = createAsyncThunk("posts/createPost", async(formData, thunkAPI) => {

    try {
        const fd = new FormData();
        fd.append("caption", formData.caption);
        fd.append("tags", JSON.stringify(formData.tags));
        fd.append("image", formData.imageFile);

        const res = await fetch("/api/post/createPost", {
            method: "POST",
            credentials: "include",
            body: fd

        })
         const data = await res.json();
         return data
    } catch (error) {
        
    }
  })

export const deletePost = createAsyncThunk("posts/deletePost", async (postId, thunkAPI) => {
    console.log('POST ID', postId)
    try {
      const res = await fetch(`/api/post/deletePost/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      return data.postId; // 👈 important
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const initialState = {
    createPost: false, //createPost Modal state
    deletePost: false, //deletePost Modal state
    submitPostLoading: false,
    loading: false,
    posts: []
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleCreatePost(state) {
      state.createPost = !state.createPost;
    },

    toggleDeletePost(state) {
        state.deletePost = !state.deletePost
    }
  },
  

  extraReducers: (builder) => {
    builder
      //Submit Post
      .addCase(submitPost.pending, (state) => {
         state.submitPostLoading = true
      })
      .addCase(submitPost.fulfilled, (state, action) => {
       state.submitPostLoading = false
       state.posts.unshift(action.payload);
       state.createPost = false
      })
      .addCase(submitPost.rejected, (state, action) => {
        
      })

      //Get All Posts
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false
       state.posts = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        
      })


    .addCase(deletePost.fulfilled, (state, action) => {
    state.posts = state.posts.filter(
        (post) => post._id !== action.payload
    );
    state.deletePost = false; 
    });

  },
});

export const {toggleCreatePost, toggleDeletePost} = postSlice.actions;
export default postSlice.reducer;
