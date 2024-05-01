import { createSlice } from "@reduxjs/toolkit";

export interface INotificationState {
  show: boolean;
  description: string;
}

const initialState: INotificationState = {
  show: false,
  description: ""
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => ({
      ...state,
      show: true,
      description: action.payload
    }),
    closeNotification: state => ({
      ...state,
      show: false
    })
  }
});

export const { showNotification, closeNotification } =
  notificationSlice.actions;
