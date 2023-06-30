import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../services/useService';

export function useUserProfile() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decodedToken ? decodedToken.idUser : null;

  const profile = useSelector((state) => state.user.profile?.data || null);

  useEffect(() => {
    if (userId) {
      dispatch(showUser(userId));
    }
  }, [dispatch, userId]);

  return profile;
}
