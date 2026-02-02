import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Register
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
    const {username, password} = formData 
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT if you use cookies
        body: JSON.stringify({ username, password }) 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Register failed");

      return data; // could be { user } or { msg }, depends on your backend
    } catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Login
export const loginUser = createAsyncThunk("auth/login",async (formData, thunkAPI) => {
    const {username, password} = formData
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }) 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Get current user (tests your auth middleware + cookie)
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/getCurrentUser", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Not authorized");

      return data; // ideally { user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);





export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async ({ username, location, bio, avatar }, thunkAPI) => {

    console.log("AVATAR:", avatar)
    try {
      const fd = new FormData();

      // Only append what exists (so you can update partial fields)
      if (username !== undefined) fd.append("username", username);
      if (location !== undefined) fd.append("location", location);
      if (bio !== undefined) fd.append("bio", bio);

      // This key name MUST match multer: upload.single("avatar")
      if (avatar) fd.append("avatar", avatar);

      const res = await fetch("/api/auth/editProfile", {
        method: "PATCH",
        credentials: "include", // if using cookies
        body: fd, // IMPORTANT: no JSON.stringify
        // IMPORTANT: do NOT set Content-Type here
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Edit profile failed");

      return data; // expect { user } or whatever your backend returns
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// ✅ Get current user (tests your auth middleware + cookie)
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Not authorized");

      return data; // ideally { user }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const initialState = {
  //Actions Loading
  loginLoading: false,
  user: {},
  authChecked: false,
  message: '',
  editProfileLoading: false,
  profileLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      clearMessage: (state) => {
        state.message = ''
      }
  },
  

  extraReducers: (builder) => {

    builder
      // Register
      .addCase(registerUser.pending, (state) => {
       state.loginLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginLoading = false
        const {message, user} = action.payload
       state.message = message
       state.user = user
       
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginLoading = false
        state.message = action.payload
      })

      //Login
      .addCase(loginUser.pending, (state) => {
       state.loginLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const {message, user} = action.payload
        state.loginLoading = false
        state.message = message
        state.user = user
      })
      
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false
        state.message = action.payload
      })

      //Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.profileLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.profileLoading = false
        state.user = action.payload
        state.authChecked = true; 
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        state.authChecked = true; 
      })

      .addCase(editProfile.pending, (state) => {
       state.editProfileLoading = true
      })

      .addCase(editProfile.fulfilled, (state, action) => {
        const {message, user} = action.payload
        state.editProfileLoading = false
        state.message = message
        state.user = user
        state.authChecked = true; 
      })

      .addCase(editProfile.rejected, (state, action) => {
        state.editProfileLoading = false
      })

        .addCase(logout.pending, (state) => {
       
      })

      .addCase(logout.fulfilled, (state, action) => {
        const {message} = action.payload
        state.message = message
        state.user = {}
      })

      .addCase(logout.rejected, (state, action) => {
       
      })
   
  },
});

export const {clearMessage} = authSlice.actions;
export default authSlice.reducer;
