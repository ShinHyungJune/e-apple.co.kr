import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

export default function Error({ name }) {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.app.errors);

  useEffect(() => {
    dispatch(actions.setErrors({}));
  }, [dispatch]);

  const errorData = errors[name];

  if (!errorData) return null;

  return (
    <>
      {Array.isArray(errorData) ? (
        errorData.map((msg, idx) => (
          <div key={idx} className="m-input-error type01">
            {msg}
          </div>
        ))
      ) : (
        <div className="m-input-error type01">{errorData}</div>
      )}
    </>
  );
}
