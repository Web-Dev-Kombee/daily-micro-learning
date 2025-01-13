import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from '../config/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  getDocs 
} from 'firebase/firestore';
import { Lesson, User } from '../types';

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Lesson', 'User'],
  endpoints: (builder) => ({
    getDailyLesson: builder.query<Lesson, void>({
      async queryFn() {
        try {
          // Implement your Firestore query here
          const lessonRef = collection(db, 'lessons');
          const q = query(lessonRef); // Add your query constraints
          const querySnapshot = await getDocs(q);
          
          // For now, return the first lesson
          const lesson = querySnapshot.docs[0]?.data() as Lesson;
          return { data: lesson };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      providesTags: ['Lesson'],
    }),

    updateUserProfile: builder.mutation<void, User>({
      async queryFn(updatedProfile) {
        try {
          const userRef = doc(db, 'users', updatedProfile.id);
          await setDoc(userRef, updatedProfile, { merge: true });
          return { data: undefined };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetDailyLessonQuery,
  useUpdateUserProfileMutation,
} = api; 